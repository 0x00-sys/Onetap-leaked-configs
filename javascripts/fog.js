
// https://www.onetap.com/threads/color-fog-correction.30909/
/**
 *
 * Title: Color enhancements
 * Author: april#0001
 * Description: Enhances the color of your game
 *
*/

//region menu

// Our main switch
const gui = require('./storage/ui.js');
gui.AddSubTab(["Config"], "Color Correction");
const enable = gui.AddCheckbox("Config", "Color Correction", "Color Correction", "Enable color enhancement");

// Our menu elements
const cc = gui.AddCheckbox("Config", "Color Correction", "Color Correction", "Color correction");
const cc_tint = gui.AddSliderInt("Config", "Color Correction", "Color Correction", "Tint", 0, 100);
const cc_intensity = gui.AddSliderInt("Config", "Color Correction", "Color Correction", "Intensity", 0, 100);

const fog = gui.AddCheckbox("Config", "Color Correction", "Color Correction", "Fog correction");
const fog_color = gui.AddColorPicker("Config", "Color Correction", "Color Correction", "Color");
const fog_distance = gui.AddSliderInt("Config", "Color Correction", "Color Correction", "Distance", 0, 10000);
const fog_density = gui.AddSliderInt("Config", "Color Correction", "Color Correction", "Density", 0, 100);

//endregion

//region functions

/**
 * Handles the visibility of our menu elements
 */
const handle_visibility = function()
{
    // Get booleans to make our life easier
    const main = gui.GetValue("Config", "Color Correction", "Color Correction", "Enable color enhancement");
    const cc = gui.GetValue("Config", "Color Correction", "Color Correction", "Color correction");
    const fog = gui.GetValue("Config", "Color Correction", "Color Correction", "Fog correction");

    // Our main switch should always be visible
    gui.SetEnabled("Config", "Color Correction", "Color Correction", "Enable color enhancement", true);

    // Update other elements based on their parents
    gui.SetEnabled("Config", "Color Correction", "Color Correction", "Color correction", main);
    gui.SetEnabled("Config", "Color Correction", "Color Correction", "Tint", cc);
    gui.SetEnabled("Config", "Color Correction", "Color Correction", "Intensity", cc);

    gui.SetEnabled("Config", "Color Correction", "Color Correction", "Fog correction", main);
    gui.SetEnabled("Config", "Color Correction", "Color Correction", "Color", fog);
    gui.SetEnabled("Config", "Color Correction", "Color Correction", "Distance", fog);
    gui.SetEnabled("Config", "Color Correction", "Color Correction", "Density", fog);
};

/**
 * Updates the fog values
 */
const update_fog = function()
{
    // Check if Fog correction is enabled
    if (!gui.GetValue("Config", "Color Correction", "Color Correction", "Fog correction"))
    {
        // Check if the fog isn't already disabled (optimization)
        if (Convar.GetString("fog_override") !== "0")
        {
            Convar.SetString("fog_override", "0");
        }

        return;
    }

    // Check if the fog isn't already enabled (optimization)
    if (Convar.GetString("fog_override") !== "1")
    {
        Convar.SetString("fog_override", "1");
    }


    // Get our fog properties
    const clr = UI.GetColor(["Config", "SUBTAB_MGR", "Color Correction", "SHEET_MGR", "Color Correction", "Color"]);
    const clr_value = clr[0] + " " + clr[1] + " " + clr[2];

    const dist = UI.GetString(["Config", "SUBTAB_MGR", "Color Correction", "SHEET_MGR", "Color Correction", "Distance"]);
    const dens = (gui.GetValue(["Config", "Color Correction", "Color Correction", "Density"]) / 100).toString();

    // Check if the fog's color isn't the same as our desired color
    if (Convar.GetString("fog_color") !== clr_value)
    {
        // Update color
        Convar.SetString("fog_color", clr_value);
    }

    // Check if the fog's end distance isn't the same as our desired end distance
    if (Convar.GetString("fog_end") !== dist)
    {
        // Update distance
        Convar.SetString("fog_start", "0");
        Convar.SetString("fog_end", dist);
    }

    // Check if the fog's density isn't the same as our desired density
    if (Convar.GetString("fog_maxdensity") !== dens)
    {
        // Update density
        Convar.SetString("fog_maxdensity", dens);
    }

}

const draw_cc = function()
{
    // Check if Color correction isn't on
    if (!gui.GetValue("Config", "Color Correction", "Color Correction", "Color correction"))
        return;

    // Get our drawing properties
    const tint = gui.GetValue("Config", "Color Correction", "Color Correction", "Tint");
    const intensity = gui.GetValue("Config", "Color Correction", "Color Correction", "Intensity");

    const x = Global.GetScreenSize()[0], y = Global.GetScreenSize()[1];

    // Draw our color correction layer
    Render.FilledRect(
        0,
        0,
        x,
        y,
        [tint,
         0,
         255 - tint,
         intensity
        ]
    );

}

// Handles the visibility whenever the script is loaded
handle_visibility();

// Disables the 3D skybox for better looking fog
Convar.SetString("r_3dsky", "0");

function main()
{

    // Callback our functions
    handle_visibility();
    update_fog();
    draw_cc();

}

//endregion

//region callbacks

// Register our callbacks
Global.RegisterCallback("Draw", "main");

//endregion


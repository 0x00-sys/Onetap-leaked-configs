
// https://www.onetap.com/threads/bloom-world.31353/#post-264795
var props = false;
var tonemapClass = 'CEnvTonemapController';

 function onRender() {
  if (!Entity.GetLocalPlayer()) {
    return;
  }

var worldColor = (
    UI.GetValue(['Visuals', "Bloom", "Bloom",'enable world color modulation'])
      ? UI.GetColor(['Visuals', "Bloom", "Bloom",'world color'])
      : [0, 0, 0]
);

  Convar.SetFloat('mat_ambient_light_r', worldColor[0] / 100);
  Convar.SetFloat('mat_ambient_light_g', worldColor[1] / 100);
  Convar.SetFloat('mat_ambient_light_b', worldColor[2] / 100);

  var entities = Entity.GetEntities();

  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    var name = Entity.GetClassName(entity);

    if (name !== tonemapClass) {
      continue;
    }

    if (!props) {
      Entity.SetProp(entity, tonemapClass, 'm_bUseCustomAutoExposureMin', true);
      Entity.SetProp(entity, tonemapClass, 'm_bUseCustomAutoExposureMax', true);
      Entity.SetProp(entity, tonemapClass, 'm_bUseCustomBloomScale', true);

      props = true;
    }

    if (props) {
      var value = UI.GetValue(['Visuals', "Bloom", "Bloom",'world exposure']) / 10;
      Entity.SetProp(entity, tonemapClass, 'm_flCustomAutoExposureMin', value);
      Entity.SetProp(entity, tonemapClass, 'm_flCustomAutoExposureMax', value);

      Entity.SetProp(entity, tonemapClass, 'm_flCustomBloomScale', UI.GetValue(['Visuals', "Bloom", "Bloom",'bloom scale']) / 10);
    }

    Convar.SetFloat('r_modelAmbientMin', UI.GetValue(['Visuals', "Bloom", "Bloom",'model ambient']) / 10);
  }
}

function init() {
  UI.AddSubTab(['Visuals', "SUBTAB_MGR"], "Bloom") 
  UI.AddCheckbox(['Visuals', "Bloom", "Bloom"],'enable world color modulation');
  UI.AddColorPicker(['Visuals', "Bloom", "Bloom"],'world color');
  UI.AddSliderFloat(['Visuals', "Bloom", "Bloom"],'world exposure', 0.0, 100.0);
  UI.AddSliderFloat(['Visuals', "Bloom", "Bloom"],'model ambient', 0.0, 100.0);
  UI.AddSliderFloat(['Visuals', "Bloom", "Bloom"],'bloom scale', 0.0, 100.0);

  UI.SetValue(['Misc.', 'Helpers', 'Client', 'Reveal hidden cvars'], 1);
  UI.SetValue(['Visuals', 'Extra','Removals', 'Disable post processing'], 0);

  Global.RegisterCallback("Draw", "onRender");
}

init();


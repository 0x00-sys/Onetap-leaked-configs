// thanks to duk#0666 for the script and shy#7360 for fixing stuff up
UI.AddMultiDropdown(["Rage", "Exploits", "General"], "Fix Extras", ["Break LC", "Instant DT"]);
UI.AddSliderInt(["Rage", "Exploits", "General"], "Shift", 0, 62);
UI.AddSliderInt(["Rage", "Exploits", "General"],"Single fire shift", 0,62)

function getDropdownValue(value, index)
{
    var mask = 1 << index;
    return value & mask ? true : false;
}

function setDropdownValue(value, index, enable)
{
    var mask = 1 << index;
    
    return enable ? ( value | mask ) : ( value & ~mask );
}

function can_shift_shot(ticks_to_shift) {
    var me = Entity.GetLocalPlayer();
    var wpn = Entity.GetWeapon(me);

    if (me == null || wpn == null)
        return false;

    var tickbase = Entity.GetProp(me, "CCSPlayer", "m_nTickBase");
    var curtime = Globals.TickInterval() * (tickbase-ticks_to_shift)

    if (curtime < Entity.GetProp(me, "CCSPlayer", "m_flNextAttack"))
        return false;

    if (curtime < Entity.GetProp(wpn, "CBaseCombatWeapon", "m_flNextPrimaryAttack"))
        return false;

    return true;
}


function GetVelocity(index) {
    var velocity = Entity.GetProp(index, "CBasePlayer", "m_vecVelocity[0]");
    return Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
}

function get_target()
{
    const players = Entity.GetEnemies();
    const me = Entity.GetLocalPlayer();

    if (!me || !Entity.IsAlive(me))
        return;

    const eye_pos = Entity.GetEyePosition(me);

    var data = {dmg: 0, fov: 180, target: null}

    if (!data.target)
    {
        const viewangles = Local.GetViewAngles();

        for (var i = 0; i < players.length; i++)
        {
            const ent = players[i];

            if (Entity.IsDormant(ent) || !Entity.IsAlive(ent))
                continue;

            const head_pos = Entity.GetHitboxPosition(ent, 0);
            const sub = [head_pos[0] - eye_pos[0], head_pos[1] - eye_pos[1], head_pos[2] - eye_pos[2]]

            const yaw = Math.atan2(sub[1], sub[0]) * 180 / Math.PI;
            const pitch = -Math.atan2(sub[2], Math.sqrt(sub[0] ** 2 + sub[1] ** 2)) * 180 / Math.PI;

            const yaw_delta = (viewangles[1] % 360 - yaw % 360) % 360;
            const pitch_delta = viewangles[0] - pitch;

            const fov = Math.sqrt(yaw_delta ** 2 + pitch_delta ** 2);

            if (data.fov > fov)
            {
                data.fov = fov;
                data.target = ent;
            }
        }
    }

    return data.target;
}



function canFire() {
    var dt_g_weapon = Entity.GetWeapon(Entity.GetLocalPlayer());
    var dt_m_next_prim_attack = Entity.GetProp(dt_g_weapon, "CBaseCombatWeapon","m_flNextPrimaryAttack");
    var dt_m_next_attack = Entity.GetProp(Entity.GetLocalPlayer(), "CBaseCombatCharacter","m_flNextAttack");
    if (dt_m_next_prim_attack > Globals.Curtime() || dt_m_next_attack > Globals.Curtime()) {
        return false;
    } else {
        return true;
    }
}
var _once = false;
var has_charged = false;
function dt_create_move(){
    if (Entity.IsValid(Entity.GetLocalPlayer())) {
        var is_charged = Exploit.GetCharge();
        var target = get_target();
        var value = UI.GetValue(["Rage", "Exploits", "General", "Options"]);
        var script_value = UI.GetValue(["Rage", "Exploits", "General", "Fix Extras"]);
        var slow_walking = UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Slow walk"]);
        var m_fFlags = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_fFlags");
        var on_ground = m_fFlags & 1;

        if (GetVelocity(Entity.GetLocalPlayer()) >= 25 && !slow_walking) {
            if (getDropdownValue(script_value, 0)) {
                value = setDropdownValue(value, 5, true);
            }
            if (GetVelocity(Entity.GetLocalPlayer()) >= 60 || !on_ground) {
                
                if (getDropdownValue(script_value, 1)) {
                    value = setDropdownValue(value, 0, true);
                }
            }
            UI.SetValue(["Rage", "Exploits", "General", "Options"], value);
        } else {
            if (Ragebot.GetTarget() == 0 && canFire()) {
                
                if (getDropdownValue(script_value, 0)) {
                    value = setDropdownValue(value, 5, false);
                }
                if (getDropdownValue(script_value, 1)) {
                    value = setDropdownValue(value, 0, false);
                }
                UI.SetValue(["Rage", "Exploits", "General", "Options"], value);
            }
        }

        
        
        
        var r_dt_hk = UI.GetValue(["Rage", "Exploits", "Keys", "Key assignment", "Double tap"]);

        if (is_charged > 0.1) {
            has_charged = false; //fix issues with multiple recharges occuring
        }
        
        if (r_dt_hk) {
            if (can_shift_shot(UI.GetValue(["Rage", "Exploits", "General", "Shift"])) && is_charged <= 0.1 && !has_charged && getDropdownValue(value, 0)) {
                _once = false;
                var dat = null;
                if (target != null) {
                    dat = Trace.Bullet(target, Entity.GetLocalPlayer(), Entity.GetHitboxPosition(target,0), Entity.GetHitboxPosition(Entity.GetLocalPlayer(),3));
                }
                if (target == null || dat == null || dat[1] < 10) {
                    Exploit.DisableRecharge();
                    Exploit.Recharge();
                    has_charged = true;
                }
            } else if (!getDropdownValue(value, 0)) {
                has_charged = false;
                if (!_once) {
                    Exploit.EnableRecharge(); //enables alpaca recharge™ when not using instant DT since we don't actually need to recharge per say when using non-instant :D
                    _once = true;
                }
            }
            var cur_weapon = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()));
            if (cur_weapon != "ssg 08" && cur_weapon != "awp" && cur_weapon != "r8 revolver") {
                Exploit.OverrideMaxProcessTicks(UI.GetValue(["Rage", "Exploits", "General", "Shift"]) + 2);
                Exploit.OverrideShift(UI.GetValue(["Rage", "Exploits", "General", "Shift"]));
                Exploit.OverrideTolerance(0);
            } else {
                Exploit.OverrideShift(UI.GetValue(["Rage", "Exploits", "General","Single fire shift"])); //lower our shift on weapons we don't necessarily care about speed between shots but preserve the exploit running at a mediocre value
            }
        }
    }
}

function dt_unload() {
    Exploit.EnableRecharge();
    Exploit.Recharge();
}

Cheat.RegisterCallback("CreateMove","dt_create_move");

Cheat.RegisterCallback("Unload","dt_unload");

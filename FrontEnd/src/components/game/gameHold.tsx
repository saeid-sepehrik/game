/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { useEffect } from "react";
import { IGameRole, IRole, Iplayer } from "../../models/models";
import { setRole } from "../newGame/role.slice";
import { useTranslation } from "react-i18next";
import { setDataGameRoleFull, setPlayer, setRoleGame } from "./game.slice";
import { setloading } from "./game.slice";
import { GameItem } from "./gameItem";

export const GameHold = () => {
  const gameSelector = useAppSelector((s) => s.game);
  const roleSelector = useAppSelector((s) => s.role);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  ////roleGame
  useEffect(() => {
    if (!gameSelector.receivedRoleGame) {
      dispatch(setRoleGame());
    }
  }, [gameSelector.receivedRoleGame]);

  ////role
  useEffect(() => {
    if (!roleSelector.receivedRole && gameSelector.receivedRoleGame) {
      dispatch(setRole(gameSelector.dataRoleGame));
    }
  }, [gameSelector.receivedRoleGame]);

  //player
  useEffect(() => {
    if (!gameSelector.receivedPlayer) dispatch(setPlayer());
  }, []);

  ///roleGameFull
  useEffect(() => {
    if (
      roleSelector.receivedRole &&
      gameSelector.receivedPlayer &&
      gameSelector.receivedRoleGame
    ) {
      const role: IRole[] = roleSelector.roleSelected;
      const gameRole: IGameRole[] = gameSelector.dataRoleGame;
      const player: Iplayer[] = gameSelector.dataPlayer;
      // console.log(player);
      // console.log(gameRole);
      const atemp = gameRole.map((m) => ({
        ...m,
        pic_path: role.filter((f) => f._id === m.id_role)[0].pic_path,
        color: role.filter((f) => f._id === m.id_role)[0].color,
        title: (role.filter((f) => f._id === m.id_role)[0] as any)[
          "title_" + i18n.language
        ],
        group: (role.filter((f) => f._id === m.id_role)[0] as any)[
          "group_" + i18n.language
        ],
        user_name: player.filter((f) => f._id === m.id_user)[0].name,
        edite: false,
      }));
      // console.log(atemp);
      dispatch(setDataGameRoleFull(atemp));
      dispatch(setloading(false));
    }
  }, [
    // gameSelector.countUpdateedRoleGame,
    roleSelector.receivedRole,
    gameSelector.receivedPlayer,
    gameSelector.receivedRoleGame,
  ]);

  return (
    <>
      <GameItem />
    </>
  );
};
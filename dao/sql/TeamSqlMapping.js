/*
 * @Author: chenanran
 * @Date: 2021-04-02 19:42:13
 */

const team = {
    updateTeamPosCount: "UPDATE team SET count = ? WHERE id = ?",
    findComByTeam: "SELECT * FROM team WHERE id = ?",
};

export default team;

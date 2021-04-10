/*
 * @Author: chenanran
 * @Date: 2021-04-02 19:42:13
 */

const team = {
    add:
        "INSERT INTO team(captain, capPositionId, comId, name, detail, date, count, missing) VALUES (?,?,?,?,?,?,?,?)",
    delete: "DELETE FROM team WHERE id = ? AND captain = ?", // 这里需要同时删除掉apply表下对应teamId的项
    updateTeamPosCountAndMissing:
        "UPDATE team SET count = ? AND missing = ? WHERE id = ?",
    findOneByTeamId: "SELECT * FROM team WHERE id = ?",
    findOneByTeamName: "SELECT * FROM team WHERE name = ?",
    findAll:
        "SELECT team.id as teamId, team.name as teamName, competition.id as comId, competition.name as comName, user.id as userId, user.name as userName, user.avatar, team.count as count FROM team, competition, user WHERE team.comId = competition.id AND team.captain = user.id",
    findMissing:
        "SELECT team.id as teamId, team.name as teamName, competition.id as comId, competition.name as comName, user.id as userId, user.name as userName, user.avatar, team.count as count FROM team, competition, user WHERE team.comId = competition.id AND team.captain = user.id AND team.missing > 0 ORDER BY competition.hot/team.missing DESC",
    findFinished:
        "SELECT team.id as teamId, team.name as teamName, competition.id as comId, competition.name as comName, user.id as userId, user.name as userName, user.avatar, team.count as count FROM team, competition, user WHERE team.comId = competition.id AND team.captain = user.id AND team.missing = 0",
};

export default team;

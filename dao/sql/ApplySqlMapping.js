/*
 * @Author: chenanran
 * @Date: 2021-04-01 15:40:47
 */

const apply = {
    add:
        "INSERT INTO apply(comId, teamId, captain, member, memPositionId, reason) VALUES (?,?,?,?,?,?)",
    delete:
        "DELETE FROM apply WHERE teamId = ? AND status <> 0 AND captain = ? OR member = ?",
    updateStatusConfirm:
        "UPDATE apply SET status = 2 WHERE captain = ? AND member = ? AND teamId = ? AND status = 1",
    updateStatusRefuse:
        "UPDATE apply SET status = 0 WHERE captain = ? AND member = ? AND teamId = ? AND status = 1",
    findCaptainByTeam:
        "SELECT competition.name as competitionName, team.name as teamName, user.name as userName, user.id as userId, user.avatar, position.positionName FROM apply, user, position, competition, team WHERE apply.teamId = ? AND apply.status = 2 AND apply.captain = user.id AND apply.teamId = team.id AND position.positionId = team.capPositionId AND apply.comId = competition.id ",
    findMemberByTeam:
        "SELECT competition.name as competitionName, team.name as teamName, user.name as userName, user.id as userId, user.avatar, position.positionName FROM apply, user, position, competition, team WHERE apply.teamId = ? AND apply.status = 2 AND apply.member = user.id AND position.positionId = apply.memPositionId AND apply.comId = competition.id AND apply.teamId = team.id",
    findOneByCaptain: "SELECT * FROM apply WHERE captain = ? AND status = 2",
    findOneByTeamAndStu:
        "SELECT * FROM apply WHERE status <> 0 AND teamId = ? AND captain = ? OR member = ?",
    findOneByMember: "SELECT * FROM apply WHERE member = ? AND status = 2",
    findPositionByName: "SELECT * FROM position WHERE positionName = ?",
    findAllPosition: "SELECT * FROM position",
    findApply:
        "SELECT apply.status, team.name as teamName, competition.name as competitionName, user.name as userName, user.id as userId ,user.avatar FROM apply, team, user, competition WHERE apply.member = ? AND apply.teamId = team.id AND team.comId = competition.id AND apply.captain = user.id", // 申请的
    findReceive:
        "SELECT apply.status, team.name as teamName, competition.name as competitionName, user.name as userName, user.id as userId, user.avatar FROM apply, team, user, competition WHERE apply.captain = ? AND apply.teamId = team.id AND team.comId = competition.id AND apply.member = user.id", // 收到的
};

export default apply;

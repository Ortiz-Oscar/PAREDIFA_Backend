const { driver } = require("../db/db");

async function aboutResolver() {
  let session = driver.session();
  let authors = await session.run(
    "match(:Authors)-[:author]->(A:Author) return A as author;"
  );
  let team = await session.run(
    "match(:Authors)-[:team]->(t:Team) return t as team;"
  );
  let course = await session.run(
    "match(:Authors)-[:course]->(C:Course) return C as course;"
  );
  let term = await session.run(
    "match(:Authors)-[:term]->(t:Term) return t as term;"
  );
  let version = await session.run(
    "match(:Authors)-[:version]->(v:Version) return v as version;"
  );
  return {
    authors: authors.records.map((a) => a.get("author").properties),
    team: team.records[0].get("team").properties,
    course: course.records[0].get("course").properties,
    term: term.records[0].get("term").properties,
    version: version.records[0].get("version").properties,
  };
}
module.exports = { aboutResolver };

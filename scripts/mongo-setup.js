conn = new Mongo();
db = conn.getDB('bottleuck');
db.addUser({ user:"bottleuck", pwd:"bottleuck", roles:["readWrite"] })

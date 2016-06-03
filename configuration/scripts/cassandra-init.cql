DROP KEYSPACE IF EXISTS urb;

CREATE KEYSPACE urb
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};

USE urb;





// Since winston-cassandra would not create schema due to issue with Cassandra Node.js driver, apparently, this:
CREATE TABLE logs(
  key text,
  date timestamp,
  level text,
  message text,
  meta text,
  PRIMARY KEY(key, date)
);
// Does not seem to resolve the problem anyway, but let's keep it here for now.




CREATE TABLE "User"(
  id uuid PRIMARY KEY,
  "User_AccountName" varchar,
  "User_AccountPassword" varchar,
  "User_DisplayName" varchar,
  "User_ProfilePhoto" varchar,
  "User_Email" varchar,
  "User_PhoneNumberMobile" varchar,
  "User_Locale" varchar,
  "User_Token2" varchar
);

CREATE INDEX "User_User_AccountName_ix"
ON "User"( "User_AccountName" );





CREATE TABLE "Compendium"(
  "id" uuid PRIMARY KEY,
  "Compendium_User_id" uuid,
  "Compendium_FirstTextInput" varchar,
  "Compendium_RangedNumber" int,
  "Compendium_Excitement" int,
  "Compendium_FollowUpQuestion" varchar,
  "Compendium_FavoriteMammal" int,
  "Compendium_FavoriteMammalOtherText" varchar,
  "Compendium_LastText" varchar,
  "Compendium_LikedSunset_Ocean" boolean,
  "Compendium_LikedSunset_Lake" boolean,
  "Compendium_LikedSunset_Mountains" boolean,
  "Compendium_LikedSunset_Plains" boolean,
  "Compendium_LikedSunset_Purple" boolean,
  "Compendium_LikedSunset_Green" boolean,
  "Compendium_LikedSunset_Other" boolean,
  "Compendium_LikedSunset_OtherText" varchar,
);

CREATE INDEX "Compendium_Compendium_User_id_ix"
ON "Compendium"( "Compendium_User_id" );





CREATE TABLE "Ensayo"(
  id uuid PRIMARY KEY,
  "Ensayo_User_id" uuid,
  "Ensayo_Title" varchar,
  "Ensayo_Description" varchar,
  "Ensayo_Content" varchar
);

CREATE INDEX "Ensayo_Ensayo_User_id_ix"
ON "Ensayo"( "Ensayo_User_id" );

insert into "Ensayo"( id, "Ensayo_User_id", "Ensayo_Title", "Ensayo_Description", "Ensayo_Content" )
values( fa666f10-483d-43bd-8ee2-4e4921c9cf82, 00000000-0000-0000-0000-000000000000,
  'Facebook just taught us all how to build websites',
  'Overview of the advantages of Relay over previous approaches focusing on the components declaring their data needs and use of GraphQL.',
  'In 2003, Brad Fitzpatrick released Memcached, and began talking about LiveJournal architecture. This became the prototype for the next generation of sites and apps, and is still largely the same way web apps are built today. https://blog.gyrosco.pe/facebook-just-taught-us-all-how-to-build-websites-51f1e7e996f2#.m7sk5nj5q'
 );

insert into "Ensayo"( id, "Ensayo_User_id", "Ensayo_Title", "Ensayo_Description", "Ensayo_Content" )
values( fa666f10-483d-43bd-8ee2-4e4921c9cf83, 00000000-0000-0000-0000-000000000000,
  'Advantages of NoSQL with Cassandra over MySQL',
  'Reasons why new projects should be started using Cassandra instead of MySQL',
  'Scalability, scalability, scalability ... I like it, do Cassandra allow me to store my data on different servers (without SAN) ? I am not talking here of replication, I speak of a single NoSQL server across multiple physical server.'
 );

insert into "Ensayo"( id, "Ensayo_User_id", "Ensayo_Title", "Ensayo_Description", "Ensayo_Content" )
values( fa666f10-483d-43bd-8ee2-4e4921c9cf84, 00000000-0000-0000-0000-000000000000,
  'React Adoption Grows',
  'Big Companies Adopting React',
  'This has been an exciting summer as four big companies: Yahoo, Mozilla, Airbnb and Reddit announced that they were using React! .... We are building an ambitious new web app, where the UI complexity represents most of the app complexity overall. It includes a tremendous amount of UI widgets as well as a lot rules on what-to-show-when. This is exactly the sort of situation React.js was built to simplify.'
 );

insert into "Ensayo"( id, "Ensayo_User_id", "Ensayo_Title", "Ensayo_Description", "Ensayo_Content" )
values( fa666f10-483d-43bd-8ee2-4e4921c9cf85, 00000000-0000-0000-0000-000000000000,
 'React Native',
 'The Killer Feature that Nobody Talks About by Robbie McCorkell',
 'At the end of January I was lucky enough to go to React conf at Facebook HQ in Menlo Park. This was my first tech conference, and it was a great and inspiring experience for me. The talks were excellent and I recommend everybody check out the videos, but the talks that really stole the show were the ones on React Native. http://red-badger.com/blog/2015/03/04/react-native-the-killer-feature-that-nobody-talks-about/'
);





CREATE TABLE "ToDo"(
  "id" uuid PRIMARY KEY,
  "ToDo_User_id" uuid,
  "ToDo_Text" varchar,
  "ToDo_Complete" boolean,
);

CREATE INDEX "ToDo_ToDo_User_id_ix"
ON "ToDo"( "ToDo_User_id" );





CREATE TABLE "Translaticiarum"(
  id uuid PRIMARY KEY,
  "Translaticiarum_User_id" uuid,
  "Translaticiarum_Date" timestamp,
  "Translaticiarum_Time" timestamp,
  "Translaticiarum_Type" int,
);

CREATE INDEX "Translaticiarum_Translaticiarum_User_id_ix"
ON "Translaticiarum"( "Translaticiarum_User_id" );

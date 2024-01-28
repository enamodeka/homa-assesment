# Task WordFinder
1. Initialize the project running `npm install`
2. To build run command `npm run build`
3. To use run command `node . <word>` OR `npm run start <word>` to get the result

# Task SQL
## A
1. The goals whose beauty is above 0.9 or below 0.1.
```sql
SELECT * FROM GOALS
WHERE beauty > 0.9 OR beauty < 0.1;
```
2. The players of 'FCB' who have scored at least 1 goal.
```sql
SELECT DISTINCT P.player_id 
FROM PLAYERS AS P
JOIN GOALS AS G ON P.player_id = G.player_id
WHERE P.team = 'FCB' AND G.goal_count >= 1;
```
3.  The players of 'FCB' whose market valuation is lower than 8.0 and who scored
    at least 10 goals.
```sql
SELECT P.player_id 
FROM PLAYERS AS P 
JOIN (SELECT player_id, COUNT(goal_id) as goal_count FROM GOALS AS G GROUP BY player_id) G ON G.player_id = P.player_id
WHERE P.team = 'FCB' AND P.market_value < 8.0 AND G.goal_count >= 10;
```

4. The number of goals scored for each team and homeland on Nov. 22nd 2016.
```sql
SELECT P.team, P.homeland, COUNT(G.goal_id) as no_of_goals
FROM PLAYERS AS P
JOIN GOALS G AS G ON G.player_id = P.player_id
WHERE DATE(G.timestamp) = '2016-11-22'
GROUP BY P.team, P.homeland;
```

5. The average goal beauty over all the players of the 'PSG' team.
```sql
SELECT AVG(G.beauty)
FROM GOALS AS G
JOIN PLAYERS AS P ON P.player_id = G.player_id
WHERE P.team = 'PSG';
```


## B
In SQL, by default, when two tables are joined an INNER JOIN is used. It selects records that have matching values in both tables. In given example using LEFT JOIN would result in returning all records from the PLAYERS table and matched records from the GOALS table. If there is no match, the result will be filled with NULL on the right side.
```sql
SELECT P.player_id, G.goal_id 
FROM PLAYERS AS P
LEFT JOIN GOALS AS G ON P.player_id = G.player_id;
```


## C
A subquery can be replaced with a LEFT JOIN and GROUP BY
```sql
SELECT COUNT(*), P.team 
FROM PLAYERS AS P
LEFT JOIN GOALS G ON P.player_id = G.player_id
WHERE G.player_id IS NULL
GROUP BY P.team;
```

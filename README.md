# Discord Token Onliner
This script allows you to mantain multiple discord accounts online with a random game status.

## Configuration
1. Install the required packages with `npm install`.
2. Fill in the `config.json` file with the required information.
3. Add your bot token(s) to the `data/tokens.txt` file.
4. Run the script using `npm start`.

## Misc
- The tokens must be valid.
- Phone verification is not required, but email verification is preferred.

## Config
```json
{
    "games": [
        "Minecraft",
        "Fortnite",
        "Rainbow Six Siege",
        "Counter-Strike 2",
        "Grand Theft Auto V",
        "League of Legends"
        // You can add more games here
    ],
    "status": "random", // Options: online, idle, dnd, random
    "changeRate": 100000 // Change status and games every X milliseconds
}

```
#
### Example
![Example](https://i.imgur.com/FDgO57S.png)

[Discord](https://discord.gg/undesync)

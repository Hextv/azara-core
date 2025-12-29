## Shadows of Azara

### Development Set Up

- Fork this repository
- cd into your TS-WoW installation directory `modules` folder.
- Delete any other modules present.
- `git clone https://github.com/[username]/azara-core.git shadows-of-azara`
- Copy `shadows-of-azara/config/worldserver.conf` to `shadows-of-azara/realms/development`, overwrite if anything else there.
- In your TS-WoW directory find `node.conf` and set the following.
    - Default.Client = "C:\\\PathToClient\\\Here"
    - Default.Realm = "shadows-of-azara.development"
    - Default.Dataset = "shadows-of-azara.dataset"
    - AutoStart.Realms = ["shadows-of-azara.development"]
- Open VS Code and open your TS-WoW directory folder.
- In the window click Terminal -> New Terminal
- `npm run start`

It is very likely that it will extract files at this point. Annoying but can't be avoided. You may also get a lot of errors. That's fine. It should still reach a point like below. 

```
[23:45:52][realm/shadows-of-azara.development] Starting up anti-freeze thread (60 seconds max stuck time)...
[23:45:52][realm/shadows-of-azara.development] TrinityCore rev. 395de7ea1e52 2024-10-12 09:18:37 +0200 (tswow branch) (Win64, RelWithDebInfo, Dynamic) (worldserver-daemon) ready...
[23:45:52][realm/shadows-of-azara.development] TC>
>
```

Once it has the next step is to run `build all`.

This will apply DBC, SQL, C++ edits etc. 

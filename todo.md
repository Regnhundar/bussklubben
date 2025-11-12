Ta bort fixImagePaths med observer från ClubHouseGameUI useEffect ifall SDK fixas.

SDK servar img logo och spinner från absolute path. Dvs /images/logo.png istället för ./images/logo.png

Ta bort css från clubHouseGameUI.css

.css-k4n45n {
max-width: 600px;
left: 50%;
transform: translateX(-50%);
}

Just nu centrerar den logo och knapp och förhindrar att den blir för stor. Bör fixas i SDK.

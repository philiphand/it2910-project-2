[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.idi.ntnu.no/#https://gitlab.stud.idi.ntnu.no/it2810-h20/team-02/prosjekt-2)

## Documentation

### Hvordan kjøre applikasjonen
Applikasjonen krever kun `npm install` og deretter `npm start` for å kjøres.

### React
Prosjektmalen er opprettet ved hjelp av kommadoen `npx create-react-app my-app --template typescript` som gir et enkel React applikasjon skrevet i TypeScript.
Alle komponentene med unntak av App.tsx er funksjonelle komponenter, mens App.tsx er en klassekomponent.
Grunnen til dette er at funksjonelle komponenter sammen med React Hooks krever mindre kode og oppnår det samme som en klassekomponent ville gjort.

**TODO:** Utdype bruken av React Context

### Responsivt web design
**TODO:** Begrunne hvordan dette er oppnådd

### Kunstinstallasjoner
Alle installasjonene er utviklet i Canvas og benytter seg av [AnalyserNode.getByteFrequencyData()](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData), denne funksjonen returnerer data om sangene som spilles.
Denne dataen kommer i form av decibel-verdiene til 256 frekvenser, som brukes av animasjonene til å visualisere lydbildet i sangen på hver sin unike måte.

Animasjonene kan endres i form av flere forskjellige valg; farge, kompleksitet og sang. Vi valgte disse alternativene fordi de 
Alle disse valgene lagres i og hentes fra localStorage.

### Dikt fra PoetryDB
Diktene hentes fra [PoetryDB](https://poetrydb.org/index.html) via [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
Den opprinnelige planen var å sende en ny HTTP request ved hvert bytte av installasjon, men dette viste seg til å være en dårlig løsning ettersom at det kan ta flere sekunder før man får respons.
Istedenfor hentes alle diktene ved oppstart og lagres i sessionStorage for umiddelbar henting av dikt.

I mellomtiden mens applikasjonen venter på svar fra PoetryDB vises det et hardkodet dikt fra [www.familyfriendpoems.com](https://www.familyfriendpoems.com/poems/teen/music/).
En ekstra fordel med å ha dette hardkodede diktet er at hvis PoetryDB er utilgjengelig, vises det uansett et dikt på siden.

### Testing

Testing er gjort med ts-jest og React Testing Library. Testene innebærer en snapshot-test av App.tsx og en DOM-test av diverse funksjonalitet i Input-menyen. 
Alle testene kjøres via `npm test` og snapshot-filen kan oppdateres ved bruk av kommandoen `jest --updateSnapshot`.

Jest tester feiler automatisk hvis de oppdager blant annet bilde- eller css-filer, så disse filene må mockes/erstattes under testingen. 
Dette gjøres ved å definere filtypene i moduleNameMapper i både jest.config.js og i package.json, moduleNameMapper peker til hvilke mock-filer som skal erstatte de opprinnelige filene.

Siden Fetch API ikke støttes av standard node.js er det nødvendig med en ekstra npm-pakke for å kjøre testene, pakken node-fetch løser dette problemet.

Applikasjonen er testet for responsivt design i Chrome på PC og Android (horisontalt og vertikalt) hvor skalering og funksjonalitet fungerer som det skal.





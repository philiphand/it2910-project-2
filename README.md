[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.idi.ntnu.no/#https://gitlab.stud.idi.ntnu.no/it2810-h20/team-02/prosjekt-2)

## Documentation

### Hvordan kjøre applikasjonen
Applikasjonen krever kun `npm install` og deretter `npm start` for å kjøres.

### React
Prosjektmalen er opprettet ved hjelp av kommadoen `npx create-react-app my-app --template typescript` som gir et enkel React applikasjon skrevet i TypeScript.
Alle komponentene med unntak av App.tsx er funksjonelle komponenter, mens App.tsx er en klassekomponent.
Grunnen til dette er at funksjonelle komponenter sammen med React Hooks krever mindre kode og oppnår det samme som en klassekomponent ville gjort.

Vi bruker React context for tilstandskontroll i to tilfeller. Det ene tilfellet er for å tilgjengeliggjøre MediaAnalyser klassen, som håndterer analyse av lydsporene som spilles, til alle komponentene i karusellen.
Det andre tilfellet er for å tilgjengeliggjøre input state til hele applikasjonen.

I MediaAnalyser sitt tilfellet hadde vi nok sluppet unna med å drille ned med props, men dersom applikasjonen vokser og blir mer kompleks kan det være fordelaktig å ha det tilgjengelig som context.

### Responsivt web design
Applikasjonen skal skalere på forskjellige flater. For å håndtere font-størrelser og layout bruker vi media queries som endrer på regelsettet om vi nærmer oss mobilstørrelse. Vi startet på desktop nivå og gjorde tilpasninger for mobil på et senere stadie. Vi kunne også ha startet å utvikle for mobil og endret det til en større layout senere. I og med at applikasjonen er såpass enkel gjør det liten forskjell, men i en mer kompleks applikasjon kan det være hensiktsmessig å jobbe "mobile first".

Skaleringen av canvas er litt mindre elegant. Her bruker vi en wrapper rundt karusell komponenten som lytter på resize events på vinduet. På resize sjekker vi størrelsen på animasjonsvinduet (øvre bit av layouten) og skalerer så karusellen deretter (den tar in viewport sin størrelse som props). En ulempe er at vi får svært dårlig ytelse når en resizer vinduet, da det fyres mange resize events. Dette kunne vært mitigert med en såkalt "debounce" funksjon, som ikke rekalkulerte layout på hver eneste resize event.

Overordnet er layouten basert på både css grid og flex, som gjør det svært enkelt å få elementene til å flyte på en god måte for mange forskjellige flater.

### Karusell
Karusellen er komponenten hvor alle kunstinstallasjonene befinner seg. Denne gjør det mulig å smidig bytte mellom
kunstinstallasjonene. Implementasjonen er bygd opp med en illusjon av infinite scroll som tillater deg å scrolle evig i begge retninger gjennom kunstinstallasjonene. For å få til dette er den første og siste kunstinstallasjon i karusellen duplisert i hver sin ende (index 0 er den dupliserte av index -2, index -1 er den dupliserte av index 1).

Når man så blar i karusellen vil man se en glide transition til høyre/venstre alt etter som hvilken vei man blar. Hvis man kommer til en duplisert kunstinstallasjon vil man etter den første transition "hoppe" tilbake til den originale kunstinstallasjonen. Dette gir en illusjon av at man kan fortsette å bla vel om man egentlig blar i fra start.

Her brukes også Context APIet for å hente state fra øverste nivået i appen. Disse blir så sendt ned via propdrilling til kunstinstallasjonene.

### Kunstinstallasjoner
Alle installasjonene er utviklet i Canvas og benytter seg av [AnalyserNode.getByteFrequencyData()](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData) samt / eller [AnalyserNode.getByteTimeDomainData()](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteTimeDomainData), disse funksjonen returnerer data om lydsporene som spilles.
Dataen kommer i form av et array med decibel-verdiene til 256 frekvenser, som brukes av animasjonene til å visualisere lydsporet på hver sin unike måte.

Animasjonene kan endres i form av flere forskjellige valg; farge, kompleksitet og sang. Vi valgte disse alternativene fordi de skalerer godt med alle animasjonene.
Valgene lagres i og hentes fra localStorage. 

### Dikt fra PoetryDB
Diktene hentes fra [PoetryDB](https://poetrydb.org/index.html) via [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
Den opprinnelige planen var å sende en ny HTTP request ved hvert bytte av installasjon, men dette viste seg til å være en dårlig løsning ettersom at det kan ta flere sekunder før man får respons.
Istedenfor hentes alle diktene ved oppstart og lagres i sessionStorage for umiddelbar henting av dikt.

I mellomtiden mens applikasjonen venter på svar fra PoetryDB vises det et hardkodet dikt fra [www.familyfriendpoems.com](https://www.familyfriendpoems.com/poems/teen/music/).
En ekstra fordel med å ha dette hardkodede diktet er at hvis PoetryDB er utilgjengelig, vises det uansett et dikt på siden.

### Testing
Testing er gjort med ts-jest og React Testing Library. Testene innebærer en snapshot-test av App.tsx og en DOM-test av diverse funksjonalitet i Input-menyen. 
Alle testene kjøres via `npm test` og snapshot-filen kan oppdateres ved bruk av kommandoen `jest --updateSnapshot`.

Tester i Jest feiler automatisk hvis de prøver å aksessere blant annet bilde- eller css-filer, så disse filene må mockes/erstattes under testingen. 
Dette gjøres ved å definere filtypene i moduleNameMapper i både jest.config.js og i package.json, moduleNameMapper peker til hvilke mock-filer som skal erstatte de opprinnelige filene.

Siden Fetch API ikke støttes av standard node.js er det nødvendig med en ekstra npm-pakke for å kjøre testene, pakken node-fetch løser dette problemet.

Applikasjonen er testet for responsivt design i Chrome på PC og Android (horisontalt og vertikalt) hvor skalering og funksjonalitet fungerer som det skal.





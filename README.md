# Networks of Roman Eleusis

*Not intended for public distribution*

By [David J. Thomas](mailto:dave.a.base@gmail.com), [thePortus.net](http://thePortus.net)

**Note:** This site is not yet intended for public distribution. It is currently built to aid the research of its author. To use the tools, click on the navigation button.

![CGI image of the Lesser Propylon at Eleusis](/client/imgs/misc/intro-1.png)

---

## Background

The Sanctuary of Eleusis was one of the most famous in the ancient world. Its occult rites, known as the Eleusinian Mysteries, literally gave us the world "mysterious." On the borders of Athens, some fourteen miles distant, stood the shrine to The Two Goddesses, Demeter and Kore (Persephone). It's rites, known as the Eleusinian Mysteries, attracted thousands of initiates every year including Athenians of all kinds, tourists and visitors, Greeks, Romans, and even several Roman Emperors.

*At this very spot*, the Athenians believed, Hades sprung from the underworld and snatched Persephone. More proudly, they boasted, it was this same spot where Demeter gave the gift of grain to humankind. The rites included several days of purification, sacrifice, and long marching and dancing into the night. We know very little because of the vow to keep all knowledge of them from any non-initiates.

For centuries, the Athenians published inscriptions in honor of individuals and gods. In the Roman era, however, they erected statues at unprecedented rates. These inscriptions, both in their individuality and in sum, provide evidence on hundreds of individuals and the workings of important institutions.

As time went on in the Roman era, not only were there more inscriptions, people, and honors, but these claims became more interwoven, and people linked themselves to more distant relatives and claims. Visualizing the interconnectedness of all this is nearly impossible traditionally. This site builds tools for the scholars to examine the individuals, institutions, and honors that appear on these inscriptions.

---

An example of the difficulty can be seen in an inscription publicly funded by Athens at Eleusis during the reign of Marcus Aurelius in honor of an extraordinary altar-priest of the sanctuary, Lucius Memmius from the deme of Thorikos. The statue is lost, but the statue base reads…

```
                                    IG II2 3620
                                    c.177-180 C.E.

    ἡ πόλις
    Λ. Μέμμιον ἐπὶ βωμῶι Θορίκιον
    τὸν ἀπὸ δᾳδούχων καὶ ἀρχόντων
    καὶ στρατηγῶν καὶ ἀγωνοθετῶν,
5   τὸν καὶ αὐτὸν μετὰ τῶν ἄλλων ἀρχῶν
    καὶ λιτουργιῶν · ἄρξαντα τὴν ἐπώ-
    νυμον ἀρχὴν καὶ στρατηγὸν ἐπὶ τὰ
    ὅπλα καὶ ἐπιμελητὴν γυμνασιαρχίας
    θεοῦ Ἁδριανοῦ  καὶ ἀγωνοθέτην τρίς,
10  πρεσβευτήν τε πολλάκις περὶ τῶν με-
    γίστων · ἐν οἷς καὶ περὶ γερουσίας · μυή-
    σαντα παρόντος θεοῦ Ἁδριανοῦ,
    μυήσαντα θεὸν Λούκιον Οὐῆρον
    Ἀρμενιακὸν Παρθικὸν καὶ Αὐτοκράτορας
15  Μ. Αὐρήλιον Ἀντωνῖνον · καὶ Μ. Αὐρήλιον
    Κόμμοδον Γερμανικοὺς Σαρματικούς,
    [λ]ιτουργήσαντα τοῖν θεοῖν · ἔτεσι Νϛ, τὸν (as altar-priest) for 56 years,
    [ἀ]π’ ἀρχιερέων · τὸν φιλόπατριν. priests; a patriot.

    The polis (honors)
    L. Memmius, the altar-priest from Thorikos,
    he (being descended) from daduchs and archons
    and generals and agonothetes,
5   himself (having) other offices
    and public benefactions; (including) being eponymous
    archon and hoplite-general
    and overseer of the gymnasiarchy
    of the divine Hadrian; and being agonothete three times,
10  also being an ambassador often concerning the greatest
    affairs; among which also were those concerning the gerousia;
    having initiated when the divine Hadrian was present,
    having initiated the divine Lucius Verus
    Armeniacus Parthicus, and the emperors
15  M. Aurelius Antoninus and M. Aurelius
    Commodus Germanicus Sarmaticus,
    benefacting the two goddesses (as altar-priest) for 56 years,
    and being one of the imperial priests; a patriot.

```

The personal boasts of Memmius reveal much about the values of the Athenian elite under the Roman empire. He was able to claim honors both civic and imperial, Athenian and Roman. Many of the offices that he advertised were public, yet his tenure of the altar-priesthood was private, obtained through his membership in the priestly college of the Kerykes. In proclaiming his descent from daduchs, the most important sacred officials of the Kerykes, and archons, the most important public offices of Athens, Memmius neatly merges civic and sacred elements. The site of Eleusis, and the activities of members of the Kerykes in particular, demonstrate that there was an informal but important connection between political and religious authority. Furthermore, ‘public’ and ‘private’ forms authority were not opposed, but regularly combined for mutual benefit. Similarly, Athenian and Roman identities were not necessarily at odds. Not only was Memmius an altar-priest at the Sanctuary of Eleusis, but he was also an imperial priest who initiated members of the emperor's family. In an attempt to cement their place in the competitive game of status display, elites regularly resorted to both Athenian and Roman honors. Roman honors supplemented, but never surpassed native Athenian status. In combining these elements they constructed a positive understanding of Athens’ place in the Roman empire.

![Dedication to the altar-priest overlayed with links](/client/imgs/misc/intro-2.png)

This project also explores a new possibility for understanding long-term trends by employing dynamic network analysis to visually map changes in the complex combinations of statuses and the reciprocal connections between individuals and institutions recorded on stone. Inscriptions are not merely passive records but also persuasive documents, selectively foregrounding some social realities while eliding others. Tracing these constellations of associations, we can put our finger on the pulse of social competition and status display and understand precisely why 'Romanization' is a difficult term to explain change at the sanctuary.

---

## Installation

1. Install [PostgreSQL 9.x](https://www.postgresql.org/) or above
2. Clone the sister repository with the data for this application `git clone https://github.com/thePortus/eleusis-data.git`
3. Move inside the repo `cd eleusis-data`
4. Read and follow the directions in the README.md file there
5. Once the database is configured, then navigate out of the directory for the repository `cd ..`
6. Install [nodejs/npm](https://nodejs.org/en/)
7. Install gulp `npm install gulp-cli -g`
8. Clone this repository `git clone https://github.com/thePortus/eleusis-node.git`
9. Move inside the repo `cd eleusis-node`
10. Install local dependencies `npm install`
11. Move client-side dependencies with gulp `gulp`
12. Run the schema creation script `node server/models/build_schema.js`
13. Connect to your postgres database and upload the data found in server/import to each table
14. Add the following settings to the bottom of your ~/.bashrc or ~/.bash_profile file
```sh
# start of custom settings for eleusis app
export PGUSER="app_postgres_username"
export PGDATABASE="app_database_name"
export PGPASSWORD="app_postgres_userpassword"
# you only need the next two if you want different hosts or ports
export PGHOST="localhost"
export PGPORT="5432"
# if you want to change the note environment or port add/change the following
export NODE_ENV="development"
export PORT=3000
```
12. Reload your config file with `source ~/.bashrc` or `source ~/.bash_profile`
13. Start the server `npm start`
14. Go to `localhost:3000`

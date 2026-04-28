# Video Klassifizierung Quiz

Ein interaktives Quiz-Interface zur Klassifizierung von Videos als "Normal" oder "Anomalie". Die Benutzeroberfläche ist vollständig auf Deutsch und mobilfreundlich optimiert.

---

## 🚀 Schnelleinstieg

### 1. Server starten

```bash
cd /home/ki/projects/work/studi-foto-tag
python3 -m http.server 8000
```

### 2. Quiz öffnen

Öffnen Sie im Browser: **http://localhost:8000**

> ⚠️ **Wichtig:** Verwenden Sie immer die HTTP-URL (`http://localhost:8000`), nicht die Datei-URL (`file://`). Andernfalls funktioniert das Quiz nicht.

### 3. Quiz nutzen

1. Klicken Sie auf **"Quiz starten"**
2. Schauen Sie sich das Video an
3. Klicken Sie **"Normal"** oder **"Anomalie"**
4. Sie erhalten sofort Feedback (Richtig/Falsch)
5. Klicken Sie **"Nächstes Video"** für das nächste Video
6. Nach allen Videos sehen Sie Ihr **Endergebnis**
7. Klicken Sie **"Erneut versuchen"**, um von vorne zu beginnen

---

## 📁 Projektstruktur

```
studi-foto-tag/
├── index.html                 # Haupt-Website
├── js/
│   └── app.js                # Quiz-Logik und Interaktionen
├── data/
│   └── videos.json           # Auto-generiertes Video-Manifest
├── generate-manifest.js      # Script zum Erzeugen des Manifests
├── csse-logo.png             # CSSE Logo (Header)
├── README.md                 # Diese Datei
├── CLAUDE.md                 # Technische Dokumentation für Entwickler
└── videos/
    ├── ano/                  # Anomalie-Videos
    │   └── {timestamp}/
    │       └── video/
    │           └── rgb-front.mp4
    └── normal/               # Normale Videos
        └── {timestamp}/
            └── video/
                └── rgb-front.mp4
```

---

## 📹 Videos verwalten

### Videos hinzufügen

1. Erstellen Sie neue Ordner im richtigen Format:
   ```
   videos/ano/{neuer-timestamp}/video/rgb-front.mp4
   videos/normal/{neuer-timestamp}/video/rgb-front.mp4
   ```
   
   Beispiel:
   ```
   videos/ano/14-30-45/video/rgb-front.mp4
   videos/normal/14-30-45/video/rgb-front.mp4
   ```

2. **Manifest regenerieren** (wichtig!):
   ```bash
   node generate-manifest.js
   ```

3. Browser aktualisieren (F5 oder Ctrl+R)

Die Skript scannt automatisch alle Verzeichnisse und aktualisiert `data/videos.json`.

### Video-Reihenfolge

Videos werden in **aufsteigender Reihenfolge der Timestamp-Namen** angezeigt (z.B. alphabetisch sortiert).

---

## ✨ Features

- 🎯 **Interaktives Quiz** mit sofortigem Feedback
- 📱 **Responsive Design** - funktioniert auf Desktop, Tablet und Mobiltelefon
- 🇩🇪 **Deutsche Benutzeroberfläche**
- 📊 **Statistiken** - Endergebnis mit Richtig/Falsch-Zähler
- 🎨 **Poliertes Design** - CSSE-Branding mit Tailwind CSS + DaisyUI
- ⚡ **Statische Website** - keine Server-Backend notwendig

---

## 🛠️ Technische Details

**Styling:**
- **Tailwind CSS** für responsives Design
- **DaisyUI** für UI-Komponenten
- **Font Awesome** für Icons
- **Primärfarbe:** CSSE Blau (#0068b4)

**Browser-Kompatibilität:**
✅ Chrome, Firefox, Safari, Edge (alle aktuellen Versionen)
✅ Mobile Browser (iOS Safari, Chrome Mobile)

---

## 🐛 Häufig gestellte Fragen

**F: Das Quiz wird nicht geladen / Fehler beim Laden der Videos**

A: Verwenden Sie `http://localhost:8000` statt `file://`. Datei-URLs funktionieren nicht wegen CORS-Sicherheitsrichtlinien.

**F: Neue Videos erscheinen nicht im Quiz**

A: Führen Sie `node generate-manifest.js` aus und laden Sie die Seite neu (F5).

**F: Kann ich die Videos randomisieren?**

A: Derzeit werden Videos in fester Reihenfolge (nach Timestamp sortiert) angezeigt. Dies kann in `js/app.js` angepasst werden.

**F: Werden Ergebnisse gespeichert?**

A: Nein, das Quiz ist ein reines Frontend-Tool. Ergebnisse werden nicht persistiert.

---

## 📝 Lizenz

Entwickelt für die Chair of Software & Systems Engineering (CSSE).

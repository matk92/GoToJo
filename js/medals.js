document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("tbody");
    const countries = [
        { position: "#1", country: "France", flag: "FR", gold: 10, silver: 10, bronze: 10, total: 30, athletes: 80 },
        { position: "#2", country: "Germany", flag: "DE", gold: 8, silver: 6, bronze: 5, total: 19, athletes: 70 },
        { position: "#3", country: "Italy", flag: "IT", gold: 6, silver: 7, bronze: 8, total: 21, athletes: 60 },
        { position: "#4", country: "Spain", flag: "ES", gold: 5, silver: 4, bronze: 6, total: 15, athletes: 50 },
        { position: "#5", country: "Portugal", flag: "PT", gold: 4, silver: 3, bronze: 2, total: 9, athletes: 40 },
        { position: "#6", country: "Netherlands", flag: "NL", gold: 3, silver: 2, bronze: 4, total: 9, athletes: 30 },
        { position: "#7", country: "Belgium", flag: "BE", gold: 2, silver: 1, bronze: 3, total: 6, athletes: 20 },
        { position: "#8", country: "Switzerland", flag: "CH", gold: 1, silver: 2, bronze: 1, total: 4, athletes: 10 },
        { position: "#9", country: "Austria", flag: "AT", gold: 0, silver: 1, bronze: 0, total: 1, athletes: 5 },
        { position: "#10", country: "Poland", flag: "PL", gold: 0, silver: 0, bronze: 1, total: 1, athletes: 5 },
        { position : "#11", country: "Sweden", flag: "SE", gold: 0, silver: 0, bronze: 0, total: 0, athletes: 0 },
        { position : "#12", country: "Denmark", flag: "DK", gold: 0, silver: 0, bronze: 0, total: 0, athletes: 0 },
        { position : "#13", country: "Norway", flag: "NO", gold: 0, silver: 0, bronze: 0, total: 0, athletes: 0 },
        { position : "#14", country: "Finland", flag: "FI", gold: 0, silver: 0, bronze: 0, total: 0, athletes: 0 },
        { position : "#15", country: "Ireland", flag: "IE", gold: 0, silver: 0, bronze: 0, total: 0, athletes: 0 },
        { position : "#16", country: "Greece", flag: "GR", gold: 0, silver: 0, bronze: 0, total: 0, athletes: 0 },
        { position : "#17", country: "Czech Republic", flag: "CZ", gold: 0, silver: 0, bronze: 0, total: 0, athletes: 0 },
        { position : "#18", country: "Slovakia", flag: "SK", gold: 0, silver: 0, bronze: 0, total: 0, athletes: 0 }

    ];

    countries.forEach((country) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${country.position}</td>
            <td><img src="https://flagsapi.com/${country.flag}/flat/64.png" alt="${country.country}" class="flag"> ${country.country}</td>
            <td>${country.gold}</td>
            <td>${country.silver}</td>
            <td>${country.bronze}</td>
            <td>${country.total}</td>
            <td>${country.athletes}</td>
        `;

        tbody.appendChild(tr);
    });
});
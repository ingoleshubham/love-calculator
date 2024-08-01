document.getElementById('love-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name1 = document.getElementById('name1').value.trim().toLowerCase();
    const name2 = document.getElementById('name2').value.trim().toLowerCase();
    const specialNames = ["anokhi","ank", "dugi", "anu", "anushri", "spidey", "irongirl","alice","cristin","kristin","lisa","maithali","maze","gwen","aliza","alisa","supriya"];
    
    let matchPercentage;

    if ((name1 === "shubham" && specialNames.includes(name2)) || (name2 === "shubham" && specialNames.includes(name1))) {
        matchPercentage = 100;
    } else if (specialNames.includes(name1) || specialNames.includes(name2)) {
        matchPercentage = 0;
    } else {
        matchPercentage = Math.floor(Math.random() * 100) + 1;
    }

    const resultText = `Love match between ${capitalizeFirstLetter(name1)} and ${capitalizeFirstLetter(name2)} is ${matchPercentage}%`;
    document.getElementById('result').innerText = resultText;

    // Display the share button
    document.getElementById('share-button').style.display = 'block';
});

document.getElementById('share-button').addEventListener('click', function() {
    const name1 = document.getElementById('name1').value.trim().toLowerCase();
    const name2 = document.getElementById('name2').value.trim().toLowerCase();
    const shareLink = `${window.location.href}?name1=${encodeURIComponent(name1)}&name2=${encodeURIComponent(name2)}`;
    
    // Display the share link and copy button
    document.getElementById('share-link').innerText = shareLink;
    document.getElementById('share-section').style.display = 'block';

    const whatsappShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this Love Calculator result: ${shareLink}`)}`;
    document.getElementById('whatsapp-share-button').setAttribute('href', whatsappShareLink);
    document.getElementById('whatsapp-share-button').style.display = 'block';
});

document.getElementById('copy-button').addEventListener('click', function() {
    const shareLink = document.getElementById('share-link').innerText;
    navigator.clipboard.writeText(shareLink).then(() => {
        alert('Share link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy the link: ', err);
    });
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Check for URL parameters
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const name1 = urlParams.get('name1');
    const name2 = urlParams.get('name2');

    if (name1 && name2) {
        document.getElementById('name1').value = name1;
        document.getElementById('name2').value = name2;
        document.getElementById('love-form').dispatchEvent(new Event('submit'));
    }
};

const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('zorvo_dashboard.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('.main');

if (sidebar && main) {
    console.log("Sidebar parent:", sidebar.parentElement.tagName);
    console.log("Main parent:", main.parentElement.tagName);
    console.log("Are they siblings?", sidebar.parentElement === main.parentElement);
    console.log("Is main after sidebar?", sidebar.compareDocumentPosition(main) & 4 /* Node.DOCUMENT_POSITION_FOLLOWING */ ? true : false);
} else {
    console.log("Sidebar or main not found!");
}

'use strict';

function createDiscoveryColumns(props) {
    let screenSize = window.innerWidth;
    let numCol = 1;
    if (screenSize > 367) {
        numCol++;
    }
    if (screenSize > 663) {
        numCol++;
    }
    if (screenSize > 800) {
        numCol++;
    }
    if (screenSize > 1200) {
        numCol++;
    }
    if (screenSize > 1500) {
        numCol++;
    }
    return (
        <div class="flex-container post-list">

        </div>
    );
}
'use strict';
import _ from 'lodash';

function createColumn(props) {
    let photoGallery = props.photoGallery.map((photo) => {
        photo = <img src={photo.src} />;
    })

    return (<div className="flex-container column-box">{photoGallery}</div>);
}

export function createDiscoveryColumns(props) {
    let photoGallery = props.photoGallery;
    let columnArray = [];

    let screenSize = props.windowWidth;
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

    if (numCol != 1) {
        columnArray = _.chunk(photoGallery, Math(photoGallery.length / numCol));
        for (let i = 0; i < numCol; i++) {
            let currentColumn = columnArray[numCol];
            let column = <createColumn photoGallery={currentColumn} />;
            columnArray.push(column);
        }
    } else {
        columnArray = <createColumn photoGallery={photoGallery} />;
    }

    return (
        <div className="flex-container post-list">
            {columnArray}
        </div>
    );
}
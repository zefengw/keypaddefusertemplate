namespace SpriteKind {
    export const UI = SpriteKind.create()
}
function InitKeys () {
    for (let index = 0; index <= keypadList.length - 1; index++) {
        mySprite = sprites.create(keypadList[index], SpriteKind.UI)
        mySprite.left = index % 7 * 23
        mySprite.top = Math.floor(index / 7) * 31
    }
}
function UpdateCursor () {
    cursorSprite.left = curX * 23
    cursorSprite.top = curY * 31
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    curX = Math.max(0, curX - 1)
    UpdateCursor()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (curX == 6) {
        curY = Math.min(2, curY + 1)
    } else {
        curY = Math.min(3, curY + 1)
    }
    UpdateCursor()
})
sprites.onCreated(SpriteKind.UI, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (SelectedCount == 4) {
        FindColumn()
    }
})
function clearScreen () {
    sprite_list = sprites.allOfKind(SpriteKind.UI)
    for (let value of sprite_list) {
        value.destroy()
    }
}
function InitCursor () {
    cursorSprite = sprites.create(img`
8 8 8 8 8 . . . . . . . . . . 8 8 8 8 8 
8 8 8 8 8 . . . . . . . . . . 8 8 8 8 8 
8 8 . . . . . . . . . . . . . . . . 8 8 
8 8 . . . . . . . . . . . . . . . . 8 8 
8 8 . . . . . . . . . . . . . . . . 8 8 
8 8 . . . . . . . . . . . . . . . . 8 8 
. . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 
8 8 . . . . . . . . . . . . . . . . 8 8 
8 8 . . . . . . . . . . . . . . . . 8 8 
8 8 . . . . . . . . . . . . . . . . 8 8 
8 8 . . . . . . . . . . . . . . . . 8 8 
8 8 . . . . . . . . . . . . . . . . 8 8 
. . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . 
8 8 . . . . . . . . . . . . . . . . 8 8 
8 8 . . . . . . . . . . . . . . . . 8 8 
8 8 . . . . . . . . . . . . . . . . 8 8 
8 8 8 8 8 . . . . . . . . . . 8 8 8 8 8 
8 8 8 8 8 . . . . . . . . . . 8 8 8 8 8 
`, SpriteKind.UI)
    UpdateCursor()
}
function col1Print () {
    clearScreen()
    pos = 0
    for (let index3 = 0; index3 <= 6; index3++) {
        if (Selections[index3] == 1) {
            mySprite = sprites.create(keypadList[index3], SpriteKind.UI)
            mySprite.left = pos % 7 * 23
            mySprite.top = 31
            pos += 1
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    current = curY * 7 + curX
    Selections[current] = Selections[current] * -1
    if (Selections[current] == 1) {
        if (SelectedCount == 4) {
            Selections[current] = Selections[current] * -1
        } else {
            SelectedCount += 1
            keypadList[current].replace(0, 7)
        }
    } else {
        SelectedCount += -1
        keypadList[current].replace(7, 0)
    }
    clearScreen()
    InitKeys()
    InitCursor()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (curY < 3) {
        curX = Math.min(6, curX + 1)
    } else {
        curX = Math.min(5, curX + 1)
    }
    UpdateCursor()
})
function InitArray () {
    Selections = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    curY = Math.max(0, curY - 1)
    UpdateCursor()
})
function FindColumn () {
    col1Count = 0
    col2Count = 0
    col3Count = 0
    col4Count = 0
    col5Count = 0
    col6Count = 0
    for (let index2 = 0; index2 <= Selections.length - 1; index2++) {
        if (Selections[index2] == 1) {
            if (index2 == 0) {
                col1Count += 1
                col2Count += 1
            } else if (index2 == 1) {
                col1Count += 1
            } else if (index2 == 2) {
                col1Count += 1
                col1Count += 3
            } else if (index2 == 3) {
                col1Count += 1
            } else if (index2 == 4) {
                col1Count += 1
                col4Count += 1
            } else if (index2 == 5) {
                col1Count += 1
                col2Count += 1
            } else if (index2 == 6) {
                col1Count += 1
                col2Count += 1
            } else if (index2 == 7) {
                col2Count += 1
            } else if (index2 == 8) {
                col2Count += 1
                col3Count += 1
            } else if (index2 == 9) {
                col2Count += 1
                col3Count += 1
            } else if (index2 == 10) {
                col2Count += 1
                col4Count += 1
            } else if (index2 == 11) {
                col3Count += 1
            } else if (index2 == 12) {
            	
            } else if (index2 == 13) {
            	
            } else if (index2 == 14) {
            	
            } else if (index2 == 15) {
            	
            } else if (index2 == 16) {
            	
            } else if (index2 == 17) {
            	
            } else if (index2 == 18) {
            	
            } else if (index2 == 19) {
            	
            } else if (index2 == 20) {
            	
            } else if (index2 == 21) {
            	
            } else if (index2 == 22) {
            	
            } else if (index2 == 23) {
            	
            } else if (index2 == 24) {
            	
            } else if (index2 == 25) {
            	
            }
        }
    }
    if (col1Count >= 4) {
        col1Print()
    }
}
let col6Count = 0
let col5Count = 0
let col4Count = 0
let col3Count = 0
let col2Count = 0
let col1Count = 0
let current = 0
let Selections: number[] = []
let pos = 0
let sprite_list: Sprite[] = []
let SelectedCount = 0
let cursorSprite: Sprite = null
let mySprite: Sprite = null
let curY = 0
let curX = 0
let list: number[] = []
curX = 0
curY = 0
scene.setBackgroundImage(bgImage)
InitArray()
InitKeys()
InitCursor()

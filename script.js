        const cells = document.querySelectorAll('.cell');
        const setting = document.querySelector('.setting');
        const replay = document.querySelector('.replay');
        const selectPlayer = document.getElementById('SelectPlayer');
        const moreMenu = document.getElementById('moremenu');
        const PlayGame = document.querySelector('.play-game');
        const popup = document.getElementById('popupMsg');
        let playerTurn = document.getElementById('player');
        let botTriggered = false;

        let gameOver = false;
        let n = 0;
        let lastMove = 'X'; // NEW: track last move

        function showPopup(message) {
            popup.innerText = message;
            popup.style.display = 'block';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 2000);
        }

        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                if (cell.textContent === '' && !gameOver && n == 0) {
                    cell.textContent = 'X';
                    lastMove = 'X'; // track last move
                    playerTurn.textContent = "'O'";
                    gameOver = false;
                    n = 1;
                    checkWin();
                }
                else if (cell.textContent === '' && !gameOver && n == 1 && selectPlayer.value === 'player') {
                    cell.textContent = 'O';
                    lastMove = 'O'; // track last move
                    playerTurn.textContent = "'X'";
                    gameOver = false;
                    n = 0;
                    checkWin();
                }
            });
        });

        replay.addEventListener('click', () => {
            cells.forEach(cell => {
                cell.textContent = '';
            });
            playerTurn.textContent = "'X'";
            gameOver = false;
            popup.style.display = 'none';
            n = 0;
            lastMove = 'X';
        });

        setting.addEventListener('click', () => {
            moreMenu.style.display = 'block';
            popup.style.display = 'none';
        });

        PlayGame.addEventListener('click', () => {
            moreMenu.style.display = 'none';
            cells.forEach(cell => {
                cell.textContent = '';
            });
            playerTurn.textContent = "'X'";
            gameOver = false;
            n = 0;
            lastMove = 'X';
        });

        function botMove() {
            if (selectPlayer.value == 'bot' && !gameOver && n == 1) {
                let emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
                if (emptyCells.length > 0) {
                    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                    randomCell.textContent = 'O';
                    lastMove = 'O'; // track bot move
                    playerTurn.textContent = "'X'";
                    gameOver = false;
                    n = 0;
                    botTriggered = true;
                    checkWin();
                }
            }
        }

        function checkWin() {
            var a = document.getElementById('0').textContent;
            var b = document.getElementById('1').textContent;
            var c = document.getElementById('2').textContent;
            var d = document.getElementById('3').textContent;
            var e = document.getElementById('4').textContent;
            var f = document.getElementById('5').textContent;
            var g = document.getElementById('6').textContent;
            var h = document.getElementById('7').textContent;
            var i = document.getElementById('8').textContent;

            const win = (
                (a == b && b == c && a != '') ||
                (d == e && e == f && d != '') ||
                (g == h && h == i && g != '') ||
                (a == d && d == g && a != '') ||
                (b == e && e == h && b != '') ||
                (c == f && f == i && c != '') ||
                (a == e && e == i && a != '') ||
                (c == e && e == g && c != '')
            );

            if (win) {
                gameOver = true;
                showPopup("Player '" + lastMove + "' Wins!"); // ✅ FIXED WINNER
            } else if (
                a !== '' && b !== '' && c !== '' &&
                d !== '' && e !== '' && f !== '' &&
                g !== '' && h !== '' && i !== ''
            ) {
                gameOver = true;
                showPopup("It's a Draw!");
            } else {
                gameOver = false;
                if (selectPlayer.value == 'bot' && !botTriggered) {
                    setTimeout(() => {
                        botMove();
                    }, 500);
                }
                botTriggered = false;
            }
        }

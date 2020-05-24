const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let pontos = 0;
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let contador = 0;
let contadorDireita = 0;

let map = [];

let jaPassou = false;

let audParede = document.getElementById("audParede");
audParede.volume = 0.25;

let audErro = document.getElementById("audErro");
audErro.volume = 0.07;

let audRebatida = document.getElementById("audRebatida");
audRebatida.volume = 0.10;

let jogoAcabou = false;
let jogoComecou = false;

class Bola {
    constructor(x, y, velX, velY, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = 'white';
        this.size = size;
    }

    Desenhar() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.fill();
    }

    VerificarSeBateu() {
        if ((this.x + this.size) >= width) {
            if (!jogoAcabou) {
                contador++;
            }
            this.x = width / 2;
            this.y = height / 2;
            this.velX = definirVelocidade();
            this.velY = definirVelocidade();
            jaPassou = false;
            if (!jogoAcabou) {
                audErro.play();
            }
        }
        if ((this.x - this.size) <= 0) {
            if (!jogoAcabou) {
                contadorDireita++;
            }
            this.x = width / 2;
            this.y = height / 2;
            this.velX = definirVelocidade();
            this.velY = definirVelocidade();
            jaPassou = false;
            if (!jogoAcabou) {
                audErro.play();
            }
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
            if (!jogoAcabou) {
                audParede.play();
            }
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
            if (!jogoAcabou) {
                audParede.play();
            }
        }
        let deu = false;

        if (this.velX < 0) {
            for (let i = 1; i < -(this.velX); i++) {
                if (this.velY < 0) {
                    if (this.x - i <= pongue.x + pongue.largura && this.y + this.size - i >= pongue.y && this.y - i <= pongue.y + pongue.altura && !jaPassou) {
                        this.velX = -(this.velX);
                        this.y += this.velY - i;
                        this.x += this.velX - i;
                        deu = true;
                        this.velX += 1;
                        this.velY -= 1;
                        jaPassou = false;
                        if (!jogoAcabou) {
                            audRebatida.play();
                        }
                        break;
                    }
                } else if (this.velY > 0) {
                    if (this.x - i <= pongue.x + pongue.largura && this.y + i >= pongue.y && this.y + i <= pongue.y + pongue.altura && !jaPassou) {
                        this.velX = -(this.velX);
                        this.y += this.velY - i;
                        this.x += this.velX - i;
                        deu = true;
                        this.velX += 1;
                        this.velY += 1;
                        jaPassou = false;
                        if (!jogoAcabou) {
                            audRebatida.play();
                        }
                        break;
                    }
                }
            }
        } else if (this.velX > 0) {
            for (let i = 1; i < this.velX; i++) {
                if (this.velY > 0) {
                    if (this.x + this.size + i >= pongueDireita.x && this.y + i >= pongueDireita.y && this.y + i <= pongueDireita.y + pongueDireita.altura && !jaPassou) {
                        this.velX = -(this.velX);
                        this.y += this.velY - i;
                        this.x += this.velX - i;
                        deu = true;
                        this.velX -= 1;
                        this.velY += 1;
                        jaPassou = false;
                        if (!jogoAcabou) {
                            audRebatida.play();
                        }
                        break;
                    }
                } else if (this.velY < 0) {
                    if (this.x + this.size + i >= pongueDireita.x && this.y + i >= pongueDireita.y && this.y + this.size + i <= pongueDireita.y + pongueDireita.altura && !jaPassou) {
                        this.velX = -(this.velX);
                        this.y += this.velY - i;
                        this.x += this.velX - i;
                        deu = true;
                        this.velX -= 1;
                        this.velY -= 1;
                        jaPassou = false;
                        if (!jogoAcabou) {
                            audRebatida.play();
                        }
                        break;
                    }
                }
            }

        }
        if (deu == false) {
            this.x += this.velX;
            this.y += this.velY;
            if (this.velX < 0 && this.x < pongue.x || this.velX > 0 && this.x + this.size > pongueDireita.x) {
                jaPassou = true;
            }
        }
    }
}

class Pongue {
    constructor(x, y, velY, largura, altura, teclaCima, teclaBaixo) {
        this.x = x;
        this.y = y;
        this.velY = velY;
        this.color = 'white';
        this.largura = largura;
        this.altura = altura;
        this.teclaCima = teclaCima;
        this.teclaBaixo = teclaBaixo;
    }
    Desenhar() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.fill();
    }
    VerificarSeTeclou() {
        if (!jogoAcabou) {
            let _this = this;
            if (map[_this.teclaCima]) {
                let bateu = false;
                for (let u = 1; u <= _this.velY; u++) {
                    if (_this.y - u <= 0) {
                        _this.y = 0;
                        bateu = true;
                        break;
                    }
                }
                if (!bateu) {
                    _this.y -= _this.velY;
                }
            } else if (map[_this.teclaBaixo]) {
                let bateu = false;
                for (let u = 1; u <= _this.velY; u++) {
                    if (_this.y + _this.altura + u >= height) {


                        _this.y = height - _this.altura;
                        bateu = true;
                        break;
                    }
                }
                if (!bateu) {
                    _this.y += _this.velY;
                }
            }
        }
    }

}

let bola = new Bola(
    this.x = width / 2,
    this.y = height / 2,
    definirVelocidade(),
    definirVelocidade(),
    10);

let pongue = new Pongue(
    100,
    385,
    20,
    10,
    110,
    87,
    83
);

let pongueDireita = new Pongue(
    width - 100,
    385,
    20,
    10,
    110,
    38,
    40
);

onkeydown = onkeyup = function(e) {
    e = e || event;
    map[e.keyCode] = e.type == 'keydown';
}

function construirNumeros(x, pontos) {
    let y = 30;
    if (contador == 15 || contadorDireita == 15) {
        if (!jogoAcabou) {
            bipFinal(0);
            bipFinal(300);
            bipFinal(600);
            bola.velX = 100;
            bola.velY = 100;
        }
        jogoAcabou = true;
    }

    if (pontos == 0) {
        escreverCaracteres(x, y, true, true, true, false, true, true, true, false, false); // 0
    } else if (pontos == 1) {
        escreverCaracteres(x, y, false, false, true, false, false, true, false, false, false); // 1
    } else if (pontos == 2) {
        escreverCaracteres(x, y, true, false, true, true, true, false, true, false, false); // 2
    } else if (pontos == 3) {
        escreverCaracteres(x, y, true, false, true, true, false, true, true, false, false); // 3
    } else if (pontos == 4) {
        escreverCaracteres(x, y, false, true, true, true, false, true, false, false, false); // 4
    } else if (pontos == 5) {
        escreverCaracteres(x, y, true, true, false, true, false, true, true, false, false); // 5
    } else if (pontos == 6) {
        escreverCaracteres(x, y, true, true, false, true, true, true, true, false, false); // 6
    } else if (pontos == 7) {
        escreverCaracteres(x, y, true, false, true, false, false, true, false, false, false); // 7
    } else if (pontos == 8) {
        escreverCaracteres(x, y, true, true, true, true, true, true, true, false, false); // 8
    } else if (pontos == 9) {
        escreverCaracteres(x, y, true, true, true, true, false, true, true, false, false); // 8
    }

}

function desenharPontilhado() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    let aux = 0;
    while (aux <= height) {
        aux += 10;
        ctx.fillRect(width / 2, aux, 2, 10);
        aux += 10;

    }
    ctx.fill();
}

function escreverCaracteres(x, y, t1, t2, t3, t4, t5, t6, t7, t8, t9) {
    if (t1) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y - 1, 60, 10);
        ctx.fill();
    }
    if (t2) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y, 10, 60);
        ctx.fill();
    }
    if (t3) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(x + 50, y, 10, 60);
        ctx.fill();
    }
    if (t4) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y + 55, 60, 10);
        ctx.fill();
    }
    if (t5) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y + 59, 10, 60);
        ctx.fill();
    }
    if (t6) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(x + 50, y + 59, 10, 60);
        ctx.fill();
    }
    if (t7) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y + 110, 60, 10);
        ctx.fill();
    }
    if (t8) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(x + 25, y, 10, 120);
        ctx.fill();
    }
    if (t9) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(x + 40, y + 56, 10, 64);
        ctx.fill();
    }
}

if (!jogoComecou) {
    x = width / 2 - 400;
    y = height / 2 - 90;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    escreverCaracteres(x, y, true, true, true, true, true, false, false, false, false); // P
    escreverCaracteres(x + 70, y, true, true, true, true, true, false, false, false, true); // R
    escreverCaracteres(x + 140, y, true, true, false, true, true, false, true, false, false); // E
    escreverCaracteres(x + 210, y, true, true, false, true, false, true, true, false, false); // S
    escreverCaracteres(x + 280, y, true, true, false, true, false, true, true, false, false); // S
    //
    escreverCaracteres(x + 400, y, true, true, false, true, true, false, true, false, false); // E
    escreverCaracteres(x + 470, y, true, true, true, false, true, true, false, false, false); // N
    escreverCaracteres(x + 540, y, true, false, false, false, false, false, false, true, false); // T
    escreverCaracteres(x + 610, y, true, true, false, true, true, false, true, false, false); // E
    escreverCaracteres(x + 680, y, true, true, true, true, true, false, false, false, true); // R



    window.addEventListener('keypress', function(tecla) {
        if (tecla.key == "Enter") {
            jogoComecou = true;
        }

    });


}

function bipFinal(segundos) {
    setTimeout(function() { audRebatida.play(); }, segundos);
}


function loop() {
    if (jogoComecou) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        bola.Desenhar();
        bola.VerificarSeBateu();
        pongue.VerificarSeTeclou();
        pongueDireita.VerificarSeTeclou();
        pongue.Desenhar();
        pongueDireita.Desenhar();
        desenharPontilhado();
        let pontos;
        if (contador > 9) {
            pontos = Number(contador.toString().charAt(1));
        } else {
            pontos = contador;
        }
        let x = width / 4 - 25;
        construirNumeros(x, pontos);
        if (contador > 9) {
            pontos = Number(contador.toString().charAt(0));
            construirNumeros(x - 90, pontos);
        }

        x = (width / 2) + (width / 4) - 25;
        if (contadorDireita > 9) {
            pontos = Number(contadorDireita.toString().charAt(1));
        } else {
            pontos = contadorDireita;
        }
        construirNumeros(x, pontos);
        if (contadorDireita > 9) {
            pontos = Number(contadorDireita.toString().charAt(0));
            construirNumeros(x - 90, pontos);
        }

    }
    requestAnimationFrame(loop);

}

loop();


function definirVelocidade() {
    let numero = Math.ceil(Math.random() * 2);
    if (numero == 1) {
        if (!jogoAcabou) {
            return 10;
        } else {
            return 20;
        }
    } else {
        if (!jogoAcabou) {
            return -10;
        } else {
            return -20;
        }
    }

}
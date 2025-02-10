const jimp = require('jimp');

async function main() {
    try {
        // Tente carregar a fonte e verifique se ocorre algum erro
        let fonte;
        try {
            fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
        } catch (fontError) {
            console.error('Erro ao carregar a fonte:', fontError);
            return; // Interrompe a execução caso a fonte falhe
        }

        // Carregar as imagens
        let mask = await jimp.read('mascara.png');
        let fundo = await jimp.read('fundo.png');

        // Redimensionar o avatar e a máscara
        avatar.resize(130, 130);
        mask.resize(130, 130);

        // Aplicar a máscara no avatar
        avatar.mask(mask);

        // Adicionar texto na imagem de fundo
        fundo.print(fonte, 170, 175, 'Pedro Ricardo');

        // Combinar o avatar com o fundo
        fundo.composite(avatar, 40, 90);

        // Salvar a imagem final
        fundo.write('beta.png');

        console.log('Imagem processada com sucesso!');
    } catch (error) {
        console.error('Erro ao processar a imagem:', error);
    }
}

main();

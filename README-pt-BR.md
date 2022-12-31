# Add Username to Top Panel

![add-username-to-toppanel](https://extensions.gnome.org/extension-data/screenshots/screenshot_1108_zJTOY5M.png)

Adicione de forma simples o seu nome de usuário na barra superior do GNOME Shell.

### Como Instalar

Vá para a [página da extensão](https://extensions.gnome.org/extension/1108/add-username-to-top-panel/), ative a [integração com GNOME Shell no navegador](https://wiki.gnome.org/Projects/GnomeShellIntegrationForChrome) (se não estiver instalado/ativado), e então apenas clique no interruptor para ativar a extensão.

Simples assim.

## Compatibilidade

Esta extensão é compatível desde a versão 3.12 até a 43 do GNOME Shell.

## Probemas Conhecidos

### Estensão mostra "Unknown" ao invés do meu nome

Se a extensão está mostrando "Unknown" ao invés do nome esperado, ou mesmo ao trocar de usuários localmente, então o problema pode ser algo que está faltando no arquivo `/etc/passwd`, onde a extensão busca a informação do nome do usuário. Dê uma conferida nele para ver se existe a informação marcada na imagem abaixo e faça o ajuste necessário (no caso adicionar o seu nome) para mostrar na próxima vez que o shell GNOME for inicializado. 

![image](https://user-images.githubusercontent.com/3674847/210005925-bd7c1aab-5d05-4650-987f-869fda41e8a6.png)

## Como compilar da fonte e instalar manualmente

Dessa forma é mais complicado. Primeiro, vá até a pasta do repositório no terminal. Depois, você precisa rodar o comando do gnome-extensions para criar a base da extensão dentro da sua máquina:

``` bash
$ gnome-extensions create --name="Add Username to Top Panel" --description="Simply add your username to topbar panel quick settings menu" --uuid="add-username-toppanel@brendaw.com"
```
Após esse comando, copie todos os arquivos da extensão para a pasta criada a partir do último comando:

``` bash
$ cp metadata.json extension.js stylesheet.css ~/.local/share/gnome-shell/extensions/add-username-toppanel@brendaw.com
```

Maravilha. Agora você precisa ativar a extensão no GNOME Shell. Para fazer isso, rode o comando abaixo:

``` bash
$ gnome-extensions enable add-username-toppanel@brendaw.com
```

"Legal, Will, mas a extensão não está aparecendo"

Bom, se isso acontecer, apenas deslogue e logue novamente para a extensão aparecer no seu ambiente gráfico.

E é isso.

## Contribuindo

Você pode contribuir de várias maneiras: criando novas funcionalidades, corrigindo eventuais bugs, melhorando a documentação e os exemplos ou traduzindo a documentação para a sua língua. As seções de [Issues](https://github.com/brendaw/add-username-toppanel/issues) e [Pull Requests](https://github.com/brendaw/add-username-toppanel/pulls) estão esperando a sua contribuição.

## Contribuidores

Veja no arquivo [AUTHORS](AUTHORS.md) a lista de nomes dos incríveis contribuidores deste projeto.

## Licença

[MIT](LICENSE) - William Brendaw e os contribuidores - 2016-2022

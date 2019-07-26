var biblioteca = {
    get: function (id, value) {
        var json = "_" + controller.layout.get().place_id;

        try {
            json = eval(json);
            if (json[id] == null) {
                if (value == null) {
                    return biblioteca.memory[id];
                }
                else {
                    return value;
                }
            }
            return json[id];
        }
        catch (ex) {
            if (biblioteca.memory[id] != null) {
                return biblioteca.memory[id];
            }
            else {
                return value;
            }
        }
    },
    memory: {
        frete: 'ENTREGA',
        entrega: 'Qual o local da entrega?',
        menu_usuario: '#menu_usuario',
        css_produto: '',
        font: 'arial',
        label_finalizar_compra: 'Finalizar Compra',
        label_horas_adicionadas: 'iten(s) adicionado(s)',
        facebook: true,
        home: "categoria",
        acompanhamento: true,
        garcom: true,
        label_cover: "<div onclick=\"controller.categoria.navbartop = true; creait.redirect('endereco')\">VERIFIQUE SE REALIZAMOS ENTREGA PARA SUA REGIÃO</div>",
        termo_uso_trabalhar: '',
        politica_trabalhar: '',
        termo_uso: '',
        conduta: ''
    }
}

var _1550188655086075 = {
    frete: 'LOCAL DA CONSULTA',
    entrega: 'Local da consulta',
    menu_usuario: '#menu_consulta',
    css_produto: 'imegem_pequena',
    label_finalizar_compra: 'Finalizar Agendamento',
    label_horas_adicionadas: 'CLIQUE AQUI CONCLUIR O AGENDAMENTO',
    facebook: true,
    home: "categoria",
    acompanhamento: true,
    garcom: false,
    distancia: 'Atendimento em',
    distancia_descricao: '24 Horas',
    isAgenda: true,
    adicionar: 'AGENDAR',
    quantidade: false,
    confirmarpedido: 'Consulta(s)',
    endereco_table: false,
    termo_uso_trabalhar: '/documentos/trabalhar_1550188655086075.pdf',
    politica_trabalhar: '/documentos/politica_1550188655086075.pdf',
    termo_uso: '/documentos/termo_1550188655086075.pdf',
    conduta: '/documentos/conduta_1550188655086075.pdf'
};

var _489662784750293 = {
    menu_usuario: '#menu_usuario',
    css_produto: '',
    font: 'rockwell',
    label_finalizar_compra: 'Finalizar Compra',
    label_horas_adicionadas: 'iten(s) adicionado(s)',
    facebook: false,
    home: "categoria",
    acompanhamento: true,
    garcom: false
}


var _1630074940572257 = {
    menu_usuario: '#menu_usuario',
    css_produto: '',
    font: 'arial',
    label_finalizar_compra: 'Finalizar Compra',
    label_horas_adicionadas: 'iten(s) adicionado(s)',
    facebook: true,
    home: "entrar",
    acompanhamento: true,
    garcom: 'chamada'
}

var _556885891122922 = {
    frete: 'ATENCÃO',
    observacao: 'none',
    label_cover: '',
    excluir_tudo: true,
    notificacao: '<span class="icon-warning" style="margin-right:5px"></span>Estou ciente de que meu pedido ficará em prateleira sem refrigeração ou aquecimento, sendo minha responsabilidade à partir do recebimento da notificação para retirada'
}

var _1348842291874669 = {
    frete: 'LOCAL DA CONSULTA',
    entrega: 'Local da consulta',
    menu_usuario: '#menu_consulta',
    css_produto: 'imegem_pequena',
    label_finalizar_compra: 'Finalizar Agendamento',
    label_horas_adicionadas: 'CLIQUE AQUI CONCLUIR O AGENDAMENTO',
    facebook: true,
    home: "categoria",
    acompanhamento: true,
    garcom: false,
    distancia: 'Atendimento em',
    distancia_descricao: '24 Horas',
    isAgenda: true,
    adicionar: 'AGENDAR',
    quantidade: false,
    confirmarpedido: 'Consulta(s)',
    endereco_table: false,
    termo_uso_trabalhar: '/documentos/trabalhar_1550188655086075.pdf',
    politica_trabalhar: '/documentos/politica_1550188655086075.pdf',
    termo_uso: '/documentos/termo_1550188655086075.pdf',
    conduta: '/documentos/conduta_1550188655086075.pdf'
}
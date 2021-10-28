$( document ).ready(function() {
	$(".container").hide();
	$("#container-home").show();
	$('#li-home').addClass('active');
	$(".alert").hide();
	$(".alert label").html("");
	$("#resultado-votacao").hide();
	$("#area-finalizar-sessao").hide();
	$("#resultado-sessao").hide();
	
	$(".nav a").click(function (event) {
		$(".alert").fadeOut();
	});
	
    $("#li-home a").click(function (event) {
		$('.nav .active').removeClass('active');
  		$('#li-home').addClass('active');

		$(".container").hide();
		$("#container-home").show();
		
		event.preventDefault();
	});
	
	$("#li-list-pautas a").click(function (event) {		
		$('.nav .active').removeClass('active');
  		$('#li-list-pautas').addClass('active');
		
		console.log("###### Buscando no banco todas as pautas.");
		$.ajax({
		    url: '/dbc/pautas/findAll',
		    type: 'GET',
		    async: false,
		    cache: false
		}).done(function(data) {
			if(data != null) {		
				$('#grid-pautas tbody > tr').remove();
				$.each(data, function(key, value){					
					var linha = "<tr><td>" + value.id + "</td><td>" + value.nome + "</td></tr>";
					$('#grid-pautas').append(linha);
	            });
			}
			
		    $(".container").hide();
			$("#container-list-pautas").show();
		}).fail(function(response) {
		    alert(response.responseText, null, "Erro");
		});
		
		event.preventDefault();
	});
	
	$("#li-list-associados a").click(function (event) {
		$('.nav .active').removeClass('active');
  		$('#li-list-associados').addClass('active');

		findAllAssociados();
		
		event.preventDefault();
	});
	
	$("#li-votacao a").click(function (event) {
		$('.nav .active').removeClass('active');
  		$('#li-votacao').addClass('active');		
		$("#resultado-votacao").hide();
		$("#resultado-sessao").hide();
		$("#area-finalizar-sessao").hide();
		
		var cookie = $.cookie('timesession');
		if(cookie != null || cookie != undefined) {
			//Há uma sessão aberta!
			$(".container").hide();
			$("#container-sessao").show();
			$("#area-votacao").show();			
			$("#area-finalizar-votacao").hide();
			
			popularComboAssociados();
		
			var dateCookie = new Date(cookie.split(";")[0]);
			var nomePauta = cookie.split(";")[2];
			var idPauta = parseInt(cookie.split(";")[1]);

			$("#id-pauta-sessao").val(idPauta);
			$("#lbl-pauta-sessao").text(nomePauta);	
			
			//iniciando cronometro
			dispararCronometro(dateCookie);			
			
		} else {
			$(".container").hide();
			$("#container-votacao").show();
			$("#area-finalizar-votacao").show();
		}
		
		populateComboPautas();
		
		event.preventDefault();
	});
	
	$("#cmb-pauta").change(function () {
		$("#id-pauta-sessao").val($("#cmb-pauta option:selected").val());
	});
	
	$("#btn-abrir-sessao").click(function (event) {
		
		var idPauta = $("#id-pauta-sessao").val();
		if(idPauta == 0 || idPauta == undefined) {
			showAlert(".alert-voto-falha", "Escolha uma pauta.");
		} else {			
			var valida = validaSessao(idPauta);
			
			if(valida == 1) {
				$(".container").hide();
				$("#container-sessao").show();	
				$("#resultado-sessao").hide();
				$("#area-finalizar-sessao").hide();
				$("#area-votacao").show();
				
				popularComboAssociados();
				
				var dateCron = null;
						
				var cookie = $.cookie('timesession');
				if(cookie != null || cookie != undefined) {
					//Há uma sessão aberta!
					var dateCookie = new Date(cookie.split(";")[0]);
					var nomePauta = cookie.split(";")[2];
					var idPauta = parseInt(cookie.split(";")[1]);
					
					$("#id-pauta-sessao").val(idPauta);
					$("#lbl-pauta-sessao").text(nomePauta);	
		
					dateCron = dateCookie;
						
				} else {
					var sessao = parseInt($("#tempo-sessao").val());
					
					sessao = (sessao == null || sessao == 0 || isNaN(sessao)) ? 1 : sessao;
					
					var date = new Date();
					date.setMinutes(date.getMinutes() + sessao);
					
					var nomePauta = $("#cmb-pauta option:selected").text();
					var idPauta = $("#cmb-pauta option:selected").val();
					
					$("#id-pauta-sessao").val(idPauta);
					$("#lbl-pauta-sessao").text(nomePauta);	
				
					//remover cookie
					$.removeCookie('timesession', { path: '/' });
					
					//iniciando cookie para que o cronometro se mantenha mesmo que a página se feche
					$.cookie('timesession', date + ";" + idPauta + ";" + nomePauta, { expires: date, path: '/' });
								
					dateCron = date;
				}
				
				//iniciando cronometro
				dispararCronometro(dateCron);
			} else {
				showAlert(".alert-voto-falha", "Esta sess&atilde;o j&aacute; est&aacute; fechada. Favor escolher outra.");
			}
		}
		
		event.preventDefault();
	});
	
	function dispararCronometro(date) {
		$("#lbl-clock").show();
		$('div#clock').countdown(date)
			.on('update.countdown', function(event) {
				var $this = $(this);
				$this.html(event.strftime('<span>%H:%M:%S</span>'));
		  	}).on('finish.countdown', function(event) {
				finalizarVotacao($(this));
		  	});
	}
	
	function finalizarVotacao(elem) {
		$("#lbl-clock").hide();
		elem.html("<label id='encerrada'>A vota&ccedil;&atilde;o est&aacute; encerrada!</label>");
		
		elem.countdown('stop');
		$.removeCookie('timesession', { path: '/' });
		
		var nomePauta = $("#lbl-pauta-sessao").text();
		var idPauta = $("#id-pauta-sessao").val();
		
		$("#tempo-sessao").val("");
		
		encerrarSessao(idPauta, nomePauta);
		
		$("#resultado-votacao").hide();
		$("#resultado-sessao").hide();
		$("#area-finalizar-sessao").show();
		$("#lbl-voto-sim").html("");
		$("#lbl-voto-nao").html("");
		$("#lbl-resultado").html("");
		$("#area-votacao").hide();		
	}
	
	$("#btn-resultado-sessao").click(function () {		
		var idPauta = $("#id-pauta-sessao").val();
		
		if(idPauta == 0) {
			showAlert(".alert-voto-falha", "Escolha uma pauta.");
		} else {		
			var valida = validaSessao(idPauta);
			
			if(valida == 0) {
				informarResultado(idPauta, "votacao");
				$("#resultado-votacao").show();
				$("#resultado-sessao").hide();
			} else {
				showAlert(".alert-voto-falha", "A sess&atilde;o desta pauta ainda n&atilde;o foi iniciada.");
			}
		}
	});
	
	$("#btn-resultado").click(function () {		
		var idPauta = $("#id-pauta-sessao").val();
		informarResultado(idPauta, "sessao");
		$("#resultado-sessao").show();
		$("#resultado-votacao").hide();
	});
	
	function informarResultado(idPauta, area) {
		console.log("###### Informando resultado!");
		$.ajax({
		    url: '/dbc/votacoes/informarResultado/' + idPauta,
		    type: 'GET',
		    async: false,
		    cache: false
		}).done(function(data) {
			if(data != null) {	
				var sim = data.sim;
				var nao = data.nao;
				
				$("#lbl-voto-sim-" + area).html("Contagem de votos SIM: " + sim);
				$("#lbl-voto-nao-" + area).html("Contagem de votos N&Atilde;O: " + nao);
				
				if(sim > nao) {
					console.log("###### O voto vencedor foi: SIM.");
					$("#lbl-resultado-" + area).html("O voto vencedor foi: SIM.");
				} else if (nao > sim) {
					console.log("###### O voto vencedor foi: N&Atilde;O.");
					$("#lbl-resultado-" + area).html("O voto vencedor foi: N&Atilde;O.");
				} else {
					console.log("###### A vota&ccedil;&atilde;o terminou em empate!");
					$("#lbl-resultado-" + area).html("A vota&ccedil;&atilde;o terminou em empate!");
				}							
			}
		}).fail(function(response) {
		    alert(response.responseText, null, "Erro");
		});
	}
	
	$("#btn-encerrar").click(function (event) {
		finalizarVotacao($("div#clock"));
	});
	
	$("#btn-nova-sessao").click(function (event) {	
		$("#li-votacao a").click();
	});
	
	$("#btn-votar").click(function (event) {
		var nomePauta = $("#cmb-pauta option:selected").text();
		var idPauta = $("#id-pauta-sessao").val();
		
		var nomeAssociado = $("#cmb-voto-associado option:selected").text();
		var idAssociado = $("#cmb-voto-associado option:selected").val();
		var cpfAssociado = $("#cmb-voto-associado option:selected").attr("cpf");
		
		var voto = $("input[name='radio-voto']:checked"). val();
				
		var data = JSON.stringify({
			pauta : {id: idPauta, nome: nomePauta}, 
			associado : {id : idAssociado, nome : nomeAssociado, cpf : cpfAssociado}, 
			voto: voto
		});		
		
		votar(data);
	});
	
	$("#btn-add-pauta").click(function (event) {
		$(".container").hide();
		$("#container-pauta").show();
		
		$("#campos-pauta input").val(null);
		
		event.preventDefault();
	});
	
	$("#btn-add-associado").click(function (event) {
		$(".container").hide();
		$("#container-associado").show();
		
		$("#campos-associado input").val(null);
		
		event.preventDefault();
	});
	
	$("#btn-salvar-associado").click(function (event) {
		var cpf = $("#cpf").val();
		var nome = $("#nome-associado").val();

		validarCpfAntesSalvarAssociado(nome, cpf);
		
		event.preventDefault();
	});
	
	$("#btn-salvar-pauta").click(function (event) {
		var nome = $("#nome-pauta").val();
		if(nome == null || nome == undefined || nome == "") {
			showAlert(".alert-voto-falha", "Preencha o nome.");
		} else {
			console.log("###### Salvando pauta.");
			$.ajax({
			    url: '/dbc/pautas/',
				data: JSON.stringify({nome: $("#nome-pauta").val(), sessao: 0}),
			    type: 'POST',
			    async: false,
			    cache: false,
				contentType: 'application/json'
			}).done(function(data) {
				findAllPautas();
				console.log("###### Pauta salva.");
			    $(".container").hide();
				$("#container-list-pautas").show();
				
				$(".alert-pauta").fadeIn();				
			}).fail(function(response) {
				if((response.responseText != null && response.responseText != undefined) && response.responseText.includes("ConstraintViolationException")) {
					showAlert(".alert-voto-falha", "Nome j&aacute; existe cadastrado.");
				} else {
					console.log("###### Erro ao salvar pauta: " + response.responseText);
			    	alert(response.responseText, null, "Erro");
				}
			});
		}
		
		event.preventDefault();
	});
	
	function encerrarSessao(idPauta, nomePauta) {
		var retorno;
		console.log("###### Encerrando sessão.");
		$.ajax({
		    url: '/dbc/pautas/encerraSessao/',
			data: JSON.stringify({id: idPauta, nome: nomePauta, sessao: 1}),
		    type: 'PUT',
		    async: false,
		    cache: false,
			contentType: 'application/json'
		}).done(function(data) {
			if(data != null) {
				console.log("###### Sessão encerrada.");
				retorno = 1;	
			}			
		}).fail(function(response) {
			console.log("###### Erro ao salvar pauta: " + response.responseText);
			retorno = 2;
		    alert(response.responseText, null, "Erro");
		});
		
		return retorno;
	}
	
	function salvarAssociado() {
		console.log("###### Salvando associado.");
		$.ajax({
		    url: '/dbc/associados/',
			data: JSON.stringify({"nome": $("#nome-associado").val(), "cpf": $("#cpf").val()}),
		    type: 'POST',
		    async: false,
		    cache: false,
			contentType: 'application/json'
		}).done(function(data) {
			findAllAssociados();
			
			console.log("###### Associado salvo.");
			
		    $(".container").hide();
			$("#container-list-associados").show();
			
			$(".alert-associado").fadeIn();
			
		}).fail(function(response) {
			if((response.responseText != null && response.responseText != undefined) && response.responseText.includes("ConstraintViolationException")) {
				showAlert(".alert-voto-falha", "Nome ou CPF j&aacute; existem cadastrados.");
			} else {
				console.log("###### Erro ao salvar associado: " + response.responseText);
		    	alert(response.responseText, null, "Erro");
			}			
		});
	}
	
	function validarCpfAntesSalvarAssociado(nome, cpf) {
		if(nome == null || nome == undefined || nome == "") {
			showAlert(".alert-voto-falha", "Preencha o nome.");
		} else if(cpf == null || cpf == undefined || cpf == "") {
			showAlert(".alert-voto-falha", "Preencha o CPF.");			
		} else {		
			console.log("###### Validando CPF antes de salvar associado.");
			$.ajax({
			    url: '/dbc/votacoes/validarCPF/' + cpf,
				crossDomain: true,
			    type: 'GET',
			    async: false,
			    cache: false,
				contentType: 'application/json'
			}).done(function(data) {	
				
				if(data != null) {
					console.log("###### CPF válido.");
					salvarAssociado();
				} else {
					console.log("###### Interface de valida&ccedil;&atilde;o de CPF com problemas.");
					showAlert(".alert-voto-falha", "Interface de valida&ccedil;&atilde;o de CPF com problemas.");
				}
	
			}).fail(function(response) {
				if(response.responseJSON != null && response.responseJSON != undefined && response.responseJSON.message == "404 NOT_FOUND") {	
					console.log("###### CPF inválido!");
					showAlert(".alert-voto-falha", "CPF inv&aacute;lido!");	
				} else {
					console.log("###### Erro ao consultar CPF: " + response.responseText);
					alert(response.responseText, null, "Erro");
				}
			});
		}
	}
	
	/*function validarCpfAntesVotar(cpf) {
		
		var retorno = 0;
		
		if(cpf == null || cpf == undefined || cpf == "") {
			showAlert(".alert-voto-falha", "Escolha um Associado para votar.");			
		}
		
		console.log("###### Validando CPF antes de votar.");		
		$.ajax({
		    url: '/dbc/votacoes/validarCPF/' + cpf,
		    type: 'GET',
		    async: false,
		    cache: false
		}).done(function(data) {				
			if(data != null) {
				if(data.status == "ABLE_TO_VOTE") {
					console.log("###### CPF validado e apto a votar.");
					retorno = 1;
				} else {
					console.log("###### CPF validado, mas inapto a votar.");
					showAlert(".alert-voto-falha", "Associado n&atilde;o est&aacute; habilitado para vota&ccedil;&atilde;o.");
				}
			} else {
				showAlert(".alert-voto-falha", "Interface de valida&ccedil;&atilde;o de CPF com problemas.");
			}
		}).fail(function(response) {
			if(response.responseJSON.message == "404 NOT_FOUND") {	
				console.log("###### CPF inválido!");		
				showAlert(".alert-voto-falha", "CPF inv&aacute;lido!");
				
			} else {
				console.log("###### Erro ao consultar CPF: " + response.responseText);
				alert(response.responseText, null, "Erro");
			}
		});	
		
		return retorno;	
	}*/
	
	function showAlert(elemento, msg) {
		$(elemento + " label").html(msg);					
		$(elemento).fadeIn();
		window.setTimeout(function () { 
             $(elemento).fadeOut();
		}, 4000);     
	}
	
	function votar(data) {		
		console.log("###### Registrando voto.");		
		$.ajax({
		    url: '/dbc/votacoes/',
			data: data,
		    type: 'POST',
		    async: false,
		    cache: false,
			contentType: 'application/json'
		}).done(function(data) {	
			console.log("###### Voto computado com sucesso!");		
			showAlert(".alert-voto-sucesso", "Voto computado com sucesso!");
		}).fail(function(response) {				
			if(response.responseJSON != null && response.responseJSON != undefined && response.responseJSON.message == "404 NOT_FOUND") {	
				console.log("###### CPF inválido!");		
				showAlert(".alert-voto-falha", "CPF inv&aacute;lido!");				
			} else if(response.status == 409) {	
				console.log("###### " + response.responseText);			
				showAlert(".alert-voto-falha", response.responseText);	
			} else {
				console.log("###### Erro ao computar voto: " + response.responseText);			
				alert(response.responseText, null, "Erro");
			}
		});
	}
	
	function validaSessao(idPauta){
		var retorno = 0;
		
		console.log("###### Validando sessão da Pauta.");	
		$.ajax({
		    url: '/dbc/pautas/validaSessao/' + idPauta,
		    type: 'GET',
		    async: false,
		    cache: false
		}).done(function(data) {
			if(data != null) {						
				if(data.sessao == 1) {
					console.log("###### Sessão da pauta encerrada.");	
					retorno = 0;						
				} else {
					console.log("###### Sessão validada.");	
					retorno = 1;
				}
			}
		}).fail(function(response) {
		    alert(response.responseText, null, "Erro");
		});
		
		return retorno;
	}
	
	function findAllAssociados(){
		console.log("###### Consultando todos os associados.");	
		$.ajax({
		    url: '/dbc/associados/findAll',
		    type: 'GET',
		    async: false,
		    cache: false
		}).done(function(data) {
			if(data != null) {		
				$('#grid-associados tbody > tr').remove();
				$.each(data, function(key, value){					
					var linha = "<tr><td>" + value.id + "</td><td>" + value.nome + "</td><td>" + value.cpf + "</td></tr>";															
	                $('#grid-associados tbody').append(linha);
	            });
			}
			
		    $(".container").hide();
			$("#container-list-associados").show();
		}).fail(function(response) {
		    alert(response.responseText, null, "Erro");
		});
	}
	
	function findAllPautas(){
		console.log("###### Consultando todos as pautas.");
		$.ajax({
		    url: '/dbc/pautas/findAll',
		    type: 'GET',
		    async: false,
		    cache: false
		}).done(function(data) {
			if(data != null) {		
				$('#grid-pautas tbody > tr').remove();
				$.each(data, function(key, value){					
					var linha = "<tr><td>" + value.id + "</td><td>" + value.nome + "</td></tr>";															
	                $('#grid-pautas tbody').append(linha);
	            });
			}
			
		    $(".container").hide();
			$("#container-list-pautas").show();
		}).fail(function(response) {
		    alert(response.responseText, null, "Erro");
		});
	}
	
	function popularComboAssociados(){
		console.log("###### Populando combo de associados.");
		$.ajax({
		    url: '/dbc/associados/findAll',
		    type: 'GET',
		    async: false,
		    cache: false
		}).done(function(data) {
			if(data != null) {		

				$('#cmb-voto-associado').find('option').remove();
				$('#cmb-voto-associado').append("<option value='0'>Selecione</option>");
				
				$.each(data, function(key, value){					
					$('#cmb-voto-associado').append($('<option>', {
                        value: value.id,
                        text: value.nome,
						cpf: value.cpf
                    }));
	            });
			}
		}).fail(function(response) {
		    alert(response.responseText, null, "Erro");
		});
	}
	
	function populateComboPautas() {
		console.log("###### Populando combo de pautas.");
		$.ajax({
		    url: '/dbc/pautas/findAll',
		    type: 'GET',
		    async: false,
		    cache: false
		}).done(function(data) {
			if(data != null) {		
				$('#cmb-pauta').find('option').remove();
				$('#cmb-pauta').append("<option value='0'>Selecione</option>");
				
				$.each(data, function(key, value){					
					$('#cmb-pauta').append($('<option>', {
                        value: value.id,
                        text: value.nome
                    }));
	            });
			}
		}).fail(function(response) {
		    alert(response.responseText, null, "Erro");
		});
	}
	
	$(".close").click(function () {
		$(".alert").fadeOut();
	});
});
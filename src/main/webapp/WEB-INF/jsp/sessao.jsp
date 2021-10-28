<div class="container" id="container-sessao">
	<div class="row">
		<div class="col-md-6 col-md-offset-3 ">
			<div class="panel panel-primary">
				<div class="panel-heading">Votação</div>
								
				<div class="panel-body" id="campos-sessao">
					<div class="alert alert-success alert-voto-sucesso" role="alert">
						<label></label>
						<button type="button" class="close" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="alert alert-warning alert-voto-falha" role="alert">
						<label></label>
						<button type="button" class="close" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
		
					<label id="lbl-clock">A votação será encerrada em:</label>
					<div id="clock"></div>
					<label>Pauta:</label>
					<input type="hidden" id="id-pauta-sessao"/>
					<label id="lbl-pauta-sessao"></label>
					
					<div id="area-votacao">
						<label>Associado:</label>
						<select id="cmb-voto-associado">
							<option value="0">Selecione</option>
						</select>
						
						<div>
							<label>Escolha o voto:</label>
							<input type="radio" name="radio-voto" id="sim-radio-voto" checked value="1"><label for="sim-radio-voto">Sim</label></input>
							<input type="radio" name="radio-voto" id="nao-radio-voto" value="0"><label for="nao-radio-voto">Não</label></input>
													
							<div id="area-votar">
								<a type="button" class="btn btn-primary btn-md" id="btn-votar" href="#">Votar</a>								
							</div>
							<div>
								<a type="button" class="btn btn-primary btn-md" id="btn-encerrar" href="#" alt="Encerrar votação a qualquer momento">Encerrar votação!</a>
							</div>
						</div>
					</div>					
					
					<div id="resultado-sessao">
						<label id="lbl-voto-sim-sessao"></label>
						<br>
						<label id="lbl-voto-nao-sessao"></label>
						<br></br>
						<label id="lbl-resultado-sessao"></label>
					</div>
					
					<div id="area-finalizar-sessao">
						<a type="button" class="btn btn-primary btn-md" id="btn-resultado" href="#">Informar Resultado</a>
						<a type="button" class="btn btn-primary btn-md" id="btn-nova-sessao" href="#">Abrir nova sessão</a>
					</div>											
				</div>				
			</div>
		</div>
	</div>
</div>
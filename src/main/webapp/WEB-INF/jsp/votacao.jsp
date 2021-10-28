<div class="container" id="container-votacao">
	<div class="row">
		<div class="col-md-6 col-md-offset-3 ">
			<div class="panel panel-primary">
				<div class="panel-heading">Iniciar votação</div>
				<div class="panel-body" id="campos-votacao">
					<div class="alert alert-warning alert-voto-falha" role="alert">
						<label></label>
						<button type="button" class="close" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					
					<label>Pauta:</label>
					<select id="cmb-pauta">
						<option value="0">Selecione</option>
					</select>
					
					<label id="lbl-tempo-sessao">Tempo da Sessão (em minutos):</label>
					<input type="text" id="tempo-sessao" name="tempo-sessao"/>
					
					<div id="resultado-votacao">
						<label id="lbl-voto-sim-votacao"></label>
						<br>
						<label id="lbl-voto-nao-votacao"></label>
						<br></br>
						<label id="lbl-resultado-votacao"></label>
					</div>
							
					<div id="area-finalizar-votacao">
						<a type="button" class="btn btn-primary btn-md" id="btn-abrir-sessao" href="#">Abrir Sessão</a>
						<a type="button" class="btn btn-primary btn-md" id="btn-resultado-sessao" href="#">Informar Resultado</a>
					</div>	
				</div>				
			</div>
		</div>
	</div>
</div>
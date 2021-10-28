<div class="container" id="container-associado">
	<div class="row">
		<div class="col-md-6 col-md-offset-3 ">
			<div class="panel panel-primary">
				<div class="panel-heading">Adicionar Associado</div>
				<div class="panel-body" id="campos-associado">
					<div class="alert alert-warning alert-voto-falha" role="alert">
						<label></label>
						<button type="button" class="close" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					
					<label>Nome:</label>
					<input type="text" id="nome-associado" name="nome-associado"/>	
					<label>CPF (sem pontos e traço):</label>
					<input type="text" id="cpf" name="cpf" maxlength="11"/>	
					<div>
						<a type="button" data-dismiss="alert" class="btn btn-primary btn-md" id="btn-salvar-associado" href="#">Salvar</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
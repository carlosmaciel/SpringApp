package app.dto;

import app.model.Associado;
import app.model.Pauta;

public class Sessao {
	
	private Pauta pauta;
	
	private Associado associado;
	
	private int voto;

	public Sessao(Pauta pauta, Associado associado, int voto) {
		this.pauta = pauta;
		this.associado = associado;
		this.voto = voto;
	}

	public Pauta getPauta() {
		return pauta;
	}

	public void setPauta(Pauta pauta) {
		this.pauta = pauta;
	}

	public Associado getAssociado() {
		return associado;
	}

	public void setAssociado(Associado associado) {
		this.associado = associado;
	}

	public int getVoto() {
		return voto;
	}

	public void setVoto(int voto) {
		this.voto = voto;
	}

	
}
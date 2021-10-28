package app.dto;

public class Resultados {
	
	private Long idPauta;
	
	private int sim;
	
	private int nao;
	
	public Resultados() {}

	public Resultados(Long idPauta, int sim, int nao) {
		this.idPauta = idPauta;
		this.sim = sim;
		this.nao = nao;
	}

	public Long getIdPauta() {
		return idPauta;
	}

	public void setIdPauta(Long idPauta) {
		this.idPauta = idPauta;
	}

	public int getSim() {
		return sim;
	}

	public void setSim(int sim) {
		this.sim = sim;
	}

	public int getNao() {
		return nao;
	}

	public void setNao(int nao) {
		this.nao = nao;
	}

	
	
}
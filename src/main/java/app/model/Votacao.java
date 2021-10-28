package app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "votacoes")
public class Votacao {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="ID_PAUTA", nullable=false)
	private Pauta pauta;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="ID_ASSOCIADO", nullable=false)
	private Associado associado;
	
	@Column(name="voto", nullable=false)
	private int voto;
	
	public Votacao() {}

	public Votacao(Pauta pauta, Associado associado, int voto) {
		this.pauta = pauta;
		this.associado = associado;
		this.voto = voto;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
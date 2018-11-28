/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package raza;

/**
 *
 * @author Alejandro Olmedo <00097017@uca.edu.sv>
 */
public class Milicia {
    String tipo;
    int ataque,  vida, id, flagDefensa=1, flagAtaque=1, flagAtaqueV2=1;

    public int getFlagDefensa() {
        return flagDefensa;
    }

    public void setFlagDefensa(int flagDefensa) {
        this.flagDefensa = flagDefensa;
    }

    public int getFlagAtaque() {
        return flagAtaque;
    }

    public void setFlagAtaque(int flagAtaque) {
        this.flagAtaque = flagAtaque;
    }
    
    
    public Milicia(String tipo, int ataque, int vida){
        this.tipo=tipo;
        this.ataque=ataque;
        this.vida=vida;
        id= Milicia.this.hashCode();
    }
    public void operar_Vida(int vida){
        this.vida+= vida;
    }
    public String getTipo() {
        return tipo;
    }

    public int getAtaque() {
        return ataque;
    }

    public int getVida() {
        return vida;
    }

    public int getId() {
        return id;
    }

    public int getFlagAtaqueV2() {
        return flagAtaqueV2;
    }

    public void setFlagAtaqueV2(int flagAtaqueV2) {
        this.flagAtaqueV2 = flagAtaqueV2;
    }
    

    @Override
    public String toString() {
        return "Milicia{" + "id=" + id + " , tipo="+tipo+" , ataque=" + ataque + ", vida=" + vida + '}';
    }
    
}

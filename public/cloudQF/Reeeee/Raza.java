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
public abstract class Raza {
    public int ataque=50, vida=70, vida_centroMandoBonus=0, ataque_especialista=0, vida_especialista=0;
    public double  oroBonus=0, piedraBonus=0, comidaBonus=0, costo_oro_soldado=150, costo_piedra_soldado=0, costo_comida_soldado=500,costo_oro_especialista=0, costo_piedra_especialista=0, costo_comida_especialista=0;
    public String raza, especialista;
    abstract public void Iniciar();
}

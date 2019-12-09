# Bills Excercise

## Descripcion

Ejercicio para practicar TDD. 

Se tiene un fichero de entrada en formato csv y se quiere aplicar un filtro para quitar aquellas líneas que sean 
inválidas según las reglas que se especifican a continuación.

### Reglas

- Es válido que algunos campos estén vacíos (apareciendo dos comas seguidas o una coma final)
- El número de factura no puede estar repetido, si lo estuviese eliminaríamos todas las líneas con
repetición.
- Los impuestos IVA e IGIC son excluyentes, sólo puede aplicarse uno de los dos. Si alguna línea
tiene contenido en ambos campos, debe quedarse fuera.
- Los campos CIF y NIF son excluyentes, solo se puede usar uno de ellos.
- El neto es el resultado de aplicar al bruto el correspondiente impuesto. Si algún neto no está
bien calculado se queda fuera.

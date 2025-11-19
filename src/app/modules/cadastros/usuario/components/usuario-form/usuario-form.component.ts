import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { UsuarioService } from '../../service/usuario-service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Button,
    SelectModule,
    TooltipModule
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent {

  form: FormGroup;

  perfilOptions = [
    { label: 'Administrador', value: 'ADMIN' },
    { label: 'Normal',        value: 'NORMAL' }
  ];

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
  this.form = this.fb.group(
    {
      primeiroNome: ['', Validators.required],
      segundoNome: ['', Validators.required],
      perfil: ['NORMAL', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    },
    {
      validators: this.senhasDevemSerIguaisValidator
    }
  );
}

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuario = this.form.value;
    console.log('[UsuarioForm] Enviando usuário', usuario);
    // this.usuarioService.criar(usuario).subscribe(...)
  }
  senhasDevemSerIguaisValidator(formGroup: FormGroup) {
  const senha = formGroup.get('senha')?.value;
  const confirmar = formGroup.get('confirmarSenha')?.value;
  return senha === confirmar ? null : { senhasDiferentes: true };
}
}

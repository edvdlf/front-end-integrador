import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Password } from 'primeng/password';
import { Select } from 'primeng/select';
import { Message } from 'primeng/message';
import { UsuarioService } from '../../service/usuario-service';
import { MessageService } from 'primeng/api';
import { UsuarioRequest } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Button,
    Password,
    Select,
    Message
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent {

  @Output() loadUsuarios = new EventEmitter<void>();
  @Output() ativarAbaSolicitadoForms = new EventEmitter<void>();
    @Output() createSolicitadoForms =  new EventEmitter<UsuarioRequest>();

  form: FormGroup;
  submitted = false;

  perfilOptions = [
    { label: 'Administrador', value: 'ADMIN' },
    { label: 'Usuário Normal', value: 'NORMAL' }
  ];

  constructor(
    private fb: FormBuilder,
  private usuarioService: UsuarioService,
   private messageService: MessageService
  ) {
    this.form = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        role: [null, Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmasenha: ['', Validators.required]
      },
      {
        validators: this.senhasIguaisValidator
      }
    );
  }

  // Validador de confirmação de senha
  private senhasIguaisValidator(group: AbstractControl) {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmasenha')?.value;

    if (!senha || !confirmar) {
      return null;
    }

    return senha === confirmar ? null : { senhasDiferentes: true };
  }

  get f() {
    return this.form.controls;
  }

  salvar() {
  this.submitted = true;

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    console.warn('[UsuarioForm] Formulário inválido', this.form.value);
    return;
  }

  const payload = this.form.value; 

  console.log('[UsuarioForm] payload', payload);

  this.createSolicitadoForms.emit(payload)
  this.form.reset()
 
}

}

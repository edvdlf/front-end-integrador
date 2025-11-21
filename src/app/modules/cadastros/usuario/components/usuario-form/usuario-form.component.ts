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

  const payload = this.form.value; // já no formato do backend (UsuarioResponse)

  console.log('[UsuarioForm] payload', payload);

  this.usuarioService.criar(payload).subscribe({
    next: (usuarioCriado) => {
      console.log('[UsuarioForm] Usuário criado com sucesso', usuarioCriado);

      // Se quiser, pode resetar o form
      this.form.reset();
      this.submitted = false;
      this.loadUsuarios.emit();
       this.ativarAbaSolicitadoForms.emit();

      // Aqui você pode exibir um toast/alert ou navegar para a listagem:
       this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário criado com sucesso!' });
      // this.router.navigate(['/usuarios']);
    },
    error: (err) => {
      console.error('[UsuarioForm] Erro ao criar usuário', err);
      // Aqui você pode exibir mensagem de erro amigável
       this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível criar o usuário.' });
    }
  });
}

}

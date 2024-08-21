import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  isEditMode: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data.map(user => ({
        ...user,
        role: this.mapRoleToDisplayName(user.role)
      }));
    }, error => {
      console.error('Erro ao buscar usuários', error);
    });
  }

  mapRoleToDisplayName(role: string): string {
    switch (role) {
      case 'ADMINISTRATOR':
        return 'Admin';
      case 'CLIENT':
        return 'Cliente';
      case 'EMPLOYEE':
        return 'Funcionário';
      default:
        return role;
    }
  }

  editUser(user: any): void {
    this.isEditMode = true;
    this.selectedUser = { ...user };
  }

  updateUser(): void {
    this.userService.updateUser(this.selectedUser.id, {
      ...this.selectedUser,
      role: this.selectedUser.role
    }).subscribe(() => {
      this.fetchUsers();
      this.isEditMode = false;
      this.selectedUser = null;
    }, error => {
      console.error('Erro ao atualizar usuário', error);
    });
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedUser = null;
  }
}

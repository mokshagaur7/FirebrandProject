import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users: any[] = [];
  editUsername: boolean = false;
  editEmail: boolean = false;
  editedUsername: string = ''; // Variable to store edited username
  editedEmail: string = ''; // Variable to store edited email

  apiUrl: string = 'http://localhost:5040/api/login';
  token: undefined;

  constructor(private router: Router, private http: HttpClient) {
    this.token = undefined;
  }

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe(
      (data: any) => {
        this.users = data;
        this.editedUsername = this.users[0]?.username; // Initialize with current username
        this.editedEmail = this.users[0]?.email; // Initialize with current email
      })
  }

  toggleEdit(field: string): void {
    if (field === 'username') {
      this.editUsername = !this.editUsername;
    } else if (field === 'email') {
      this.editEmail = !this.editEmail;
    }
  }

  saveChanges(): void {
    // Update user details in the API
    const updatedUserData = {
      username: this.editedUsername,
      email: this.editedEmail
      // Add other properties as needed
    };

    this.http.post(this.apiUrl, updatedUserData).subscribe(
      (response: any) => {
        console.log('User details updated:', response);
        // Optionally, you can update the local user data as well
        this.users[0].username = this.editedUsername;
        this.users[0].email = this.editedEmail;
        // Disable editing after successful update
        this.editUsername = false;
        this.editEmail = false;
      },
      (error: any) => {
        console.error('Error updating user details:', error);
      }
    );
  }
}

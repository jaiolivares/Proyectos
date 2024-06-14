import { Component, Input } from "@angular/core";

@Component({
  selector: "app-bancos-modal",
  standalone: true,
  imports: [],
  templateUrl: "./bancos-modal.component.html",
  styleUrl: "./bancos-modal.component.css",
})
export class BancosModalComponent {
  @Input() mensaje?: string;
}

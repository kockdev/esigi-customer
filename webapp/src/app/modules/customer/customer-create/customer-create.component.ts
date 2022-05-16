import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomerProvider } from "src/providers/customer.provider";
import { CepService } from "src/services/cep.service";

@Component({
  selector: "app-customer-create",
  templateUrl: "./customer-create.component.html",
  styleUrls: ["./customer-create.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CustomerCreateComponent implements OnInit {
  customerForm!: FormGroup;
  step: number = 2;

  constructor(private fb: FormBuilder, private customerProvider: CustomerProvider, private http: HttpClient, private cepService: CepService) {}

  ngOnInit(): void {
    this.initForm();
    this.customerForm.valueChanges.subscribe((res) => {
      console.log(
        "🚀 ~ file: customer-create.component.ts ~ line 20 ~ CustomerCreateComponent ~ ngOnInit ~ this.customerForm.getRawValue();",
        this.customerForm.getRawValue()
      );
    });

    this.customerForm.valueChanges.subscribe((res) => {
      const addressForm = this.customerForm.controls[
        'Address'
      ] as FormGroup;
      console.log(
        
        addressForm
      );
      addressForm.controls['cep'].valueChanges.subscribe((res) => {
        console.log(
          "🚀 ~ file: collaborator-register-tab.component.ts ~ line 57 ~ CollaboratorRegisterTabComponent ~ addressForm.controls['cep'].valueChanges.subscribe ~ res",
          res
        );
      });
    });
  }

  initForm() {
    this.customerForm = this.fb.group({
      corporateName: ["TUPI LTDA", [Validators.required]],
      tradingName: ["TUPI", [Validators.required]],

      active: ["", [Validators.required]],
      cnpj: [
        "89177533968",
        [
          Validators.required,
          Validators.maxLength(14),
          Validators.minLength(14),
        ],
      ],
      stateRegistration: [
        "362410298",
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      ],
      municipalRegistration: [
        "021563985",
        [Validators.required, Validators.maxLength(9), Validators.minLength(9)],
      ],

      phoneNumber: ["47 3330-9563", Validators.required],
      mail: ["", [Validators.required, Validators.email]],
      site: ["", [Validators.required]],
      // name: ["", [Validators.required]],
      // office: ["", [Validators.required]],

      Address: this.fb.group({
        zipCode: [
          "89032560",
          [
            Validators.required,
            Validators.maxLength(9),
            Validators.minLength(9),
          ],
        ],
        street: ["Rua Bahia", [Validators.required]],
        number: ["5088", [Validators.required]],
        complement: ["Perto da Academia SportLife"],
        state: ["Santa Catarina ", [Validators.required]],
        city: ["Joinville", [Validators.required]],
      }),

      // createDate: ["01/07/2003", [Validators.required]],

      Contacts: this.fb.array([{
        name: "João",
        office: "Comprador",
        phoneNumber: "71 992535862",
        mail: "asda@asdsa",
      },
      {
        name: "Pedro",
        office: "Diretor",
        phoneNumber: "47 992952121",
        mail: "asda@asdsa",
      },
      {
        name: "Maria",
        office: "Gerente de TI",
        phoneNumber: "48 992538654",
        mail: "asda@asdsa",
      },

    ]),
    });
  }

  async saveCustomer() {
    
      const data = this.customerForm.getRawValue();

      try {
        const customer = await this.customerProvider.store(data);
        console.log("🚀 ~ file: customer-create.component.ts ~ line 104 ~ CustomerCreateComponent ~ saveCustomer ~ data", data)
      }catch (error) {
        console.log('ERROR 132' + error)
      }
 
    
  }
  handleChanges(value: any): void {
    console.log(
      "🚀 ~ file: customer-create.component.ts ~ line 28 ~ CustomerCreateComponent ~ handleChanges ~ value",
      value
    );
  }

  handleStep(number: number): void {
    this.step = number;
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === "back") {
      this.step -= 1;
    } else if (this.step < 3 && direction === "next") {
      this.step += 1;
    }
  }

 
}
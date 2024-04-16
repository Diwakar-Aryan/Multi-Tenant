export class TenantModel {
  id: string;
  name: string;
  subdomain: string;
  constructor(id: string, name: string, subdomain?: string) {
    this.id = id;
    this.name = name;
    this.subdomain = subdomain || 'https://faker.com';
  }
}

import { ApiService } from "./api.service";
import { SubdomainResponseDto } from "./interfaces/subdomain.interface";

class SubdomainService {
  public async getSubdomainSuggestions(queryString: string) {
    const result: SubdomainResponseDto = await ApiService.get(
      "/subdomains/suggestions?" + queryString,
      true
    );
    return result;
  }
}

const subdomainService = new SubdomainService();

export default subdomainService;

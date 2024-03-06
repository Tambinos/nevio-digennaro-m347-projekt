package AngularexamBackend.AngularexamBackend.Services;

import AngularexamBackend.AngularexamBackend.Entities.GeneralData;
import AngularexamBackend.AngularexamBackend.Repositories.GeneralDataRepository;
import org.springframework.stereotype.Service;

@Service
public class GeneralDataService {
    GeneralDataRepository generalDataRepository;

    public GeneralDataService(GeneralDataRepository generalDataRepository) {
        this.generalDataRepository = generalDataRepository;
    }
    public Long getGeneralData(String description) {
        return generalDataRepository.findAll().stream().filter(generalData -> generalData.getDescription().equals(description)).findFirst().get().getId();
    }
    public void setGeneralData(String description, Long id) {
        GeneralData newGeneralData = generalDataRepository.findAll().stream().filter(generalData -> generalData.getDescription().equals(description)).findFirst().get();
        newGeneralData.setId(id);
        generalDataRepository.save(newGeneralData);
    }
}

import { SOARModule } from "../SOARModule"
import { getGrowthModuleSurvey } from '../dataGenerator'

const modules = [
    {
        name: "Growth Module",
        survey: getGrowthModuleSurvey()
    }
]

export function generateModuleList (): SOARModule[] {
    const finalModules = []
    for (const module of modules) {
        finalModules.push(new SOARModule(module.name, module.survey))
    }
    return finalModules
}
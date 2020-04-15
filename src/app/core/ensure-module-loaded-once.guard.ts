export class EnsureModuleLoadedOnceGuard {
    constructor(targetModule: any) {
        if (targetModule) {
            throw new Error('${targetModule.constructor.module} has already been loaded, Import this in AppModule only');
        }
    }
}

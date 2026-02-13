let isNavigationCollapsed = $state(true);

export let getNavigationCollapse = () => isNavigationCollapsed;

export let setNavigationCollapse = (state: boolean) => isNavigationCollapsed = state;
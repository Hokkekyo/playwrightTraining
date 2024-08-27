import { test, Browser, Page, expect } from '@playwright/test';
import { error } from 'console';
import { escape } from 'querystring';

(async () => {

    let browser: Browser;
    let page: Page;
    
    test.describe('Actions in the Automation Sandbox', () => {

        test('Given the user click on Dynamic ID Button', async ({ page }) => {
            await test.step('When the user navigate to the automation sandbox of Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/'); 
            })
            
            await test.step('Then the user can click on the button with dynamic ID', async () => {
                await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click();
            })
            
            await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible();
            
        })

        //

        test('Given the user fill a text field in Automation Sandbox', async ({ page }) => {
            await test.step('When the user navigate to the automation sandbox of Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/'); 
            })
            
            await test.step('Then the user can enter text in the field A Boring Text', async () => {
                await page.getByPlaceholder('Ingresá texto').fill('Estoy aprendiendo Playwright');
            })
        })
        
        //
        
        test('Given the user can select checkboxes', async ({page}) => {
            await test.step('When the user navigate to the automation sandbox of Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            
            await test.step('Then the user can select the checkbox for pasta', async () => {
                await page.getByLabel('Pasta 🍝').check();
            })
        })

        //

        test('Given the user can select a radio button', async ({page}) => {
            await test.step('When the user navigate to the automation sandbox of Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            
            await test.step('Then user can select "no" radio button', async () => {
                await page.getByLabel('No').check();
            })
        })
        
        //

        test('Given the user select an item from the first dropdown list', async ({page}) => {
            await test.step('When the user navigate to the automation sandbox of Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            
            await test.step('Select a sport', async () => {
                await page.getByLabel('Dropdown').selectOption('Fútbol');
            })
        })
        
        //

        test('Given the user select a day from the dropdown day of the week', async ({page}) => {
            await test.step('When the user navigate to the automation sandbox of Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            
            await test.step('Then the user select a day of the week', async () => {
                await page.getByRole('button', {name: 'Día de la semana'}).click();
                await page.getByRole('link', {name: 'Martes'}).click();
            })
            
        })    
        
        //

        test('The dropdown items are as expected', async ({ page }) => {
            await test.step('When the user navigate to the automation sandbox of Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            
            await test.step('Then I valid that the dropdown list contains the expected sports', async () => {
                const deportes = ['Fútbol', 'Tennis', 'Basketball']
                
                for (let opcion of deportes) {
                    const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                    if (element) {
                        console.log(`La opción '${opcion}' está presente.`);
                    } else {
                        throw new Error(`La opción '${opcion}' no está presente.`);
                    }
                }
                
            })
            
        })
        
        //

        test('Given the user can select radio button', async ({ page }) => {
            await test.step('When the user navigate to the automation sandbox of Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            
            await test.step('Then the user can select the radio button “no”. ', async () => {
                await page.getByLabel('No').check();
                await expect(page.getByLabel('No'), 'El radio button "no" se seleccionó').toBeChecked();
            })
        })
        
        //

        test('I validate the column Names of the static table', async ({ page }) => {
            await test.step('When the user navigate to the automation sandbox of Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            
            await test.step('Then I can validate the elements for the static table column', async () => {
                const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
                await test.info().attach('screenshot', {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                })
                expect(valoresColumnaNombres).toEqual(nombresEsperados);
            })
            
        })
        
        //

        test('Given that I validate all values change in the dynamic table after a reload', async ({ page }) => {
            await test.step('When the user navigate to the automation sandbox of Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            
            await test.step('Then I valid that the values changed when reloading the site', async () => {
                const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresTablaDinamica);
                
                await page.reload();
                
                const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresPostReload);
                
                expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
                
            })
            
        })
        
        //

        test('Soft assertion', async ({ page }) => {
            await test.step('When the user navigate to the automation sandbox of Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Then I validate that all items in the checkboxes are correct.', async () => {
                await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizza 🍕').toBeVisible();
                await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
                await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
                await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helado 🍧').toBeVisible();
                await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
            })
            
        })
        
        //

        test('Valdidating inside a pop-up', async ({ page }) => {
            await test.step('When the user navigate to the automation sandbox of Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            
            await test.step('When I click on the popup button', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })
            
            await test.step('Then I can validate an element inside the popup', async () => {
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();
                
            })
            
        })
    })
     
})();
   




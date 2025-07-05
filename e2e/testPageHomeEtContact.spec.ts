// Importer les modules nécessaires pour les tests Playwright
import { test, expect } from "@playwright/test";

// Définir le contexte de test
test("Vérifier le titre de la page d'accueil", async ({ page }) => {
  // Naviguer vers la page d'accueil
  await page.goto("http://localhost:3000/");
  // Vérifier que le titre de la page est correct
  await expect(page.getByRole('heading', { name: 'OnWay' })).toBeVisible();
  // Vérifier que le sous-titre de la page est correct
  await expect(page.getByRole('heading', { name: 'Ou allez-vous ?' })).toBeVisible();
});

test("Navige vers la page contact", async ({ page }) => {
  // Naviguer vers la page d'accueil
  await page.goto("http://localhost:3000/");
  // Cliquer sur le lien "Contact"
  await page.click("text='Contact'");
});

test("Vérifier la présence du formulaire de contact", async ({ page }) => {
  //Naviguer vers la page de contact
  await page.goto("http://localhost:3000/contact");
  // Vérifier que le formulaire de contact est visible
  await expect(page.getByRole('heading', { name: 'Nous contacter' })).toBeVisible();
  await expect(page.getByLabel('Votre nom :')).toBeVisible();
  await expect(page.getByLabel('Votre email :')).toBeVisible();
  await expect(page.getByLabel('Votre téléphone :')).toBeVisible();
  await expect(page.getByLabel('L\'objet de votre demande :')).toBeVisible();
  await expect(page.getByLabel('Votre message :')).toBeVisible();
});

test('Soumission du formulaire de contact avec succès', async ({ page }) => {
  // Naviguer vers la page de contact
  await page.goto('http://localhost:3000/contact');

  // Remplir les champs du formulaire
  await page.fill('#contactNom', 'Jean Dupont');
  await page.fill('#contactEmail', 'jean.dupont@example.com');
  await page.fill('#contactTelephone', '0601020304');
  await page.fill('#contactTitre', 'Demande d\'information');
  await page.fill('#contactDescription', 'Bonjour, je souhaite en savoir plus sur vos services.');

  // Attendre que le bouton soit activé (validations côté client)
  const submitButton = page.locator('#btnContact');
  await expect(submitButton).toBeEnabled();

  // Cliquer sur le bouton Envoyer
  await submitButton.click();

  // Vérifier que le message de succès s'affiche
  const successMessage = page.locator('.alert-success');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toContainText('Votre email à bien été envoyé'); // Vérifie que le message de succès contient le texte attendu
});
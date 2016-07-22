feature 'Feature-find last train' do

  describe 'find last train To brixton from Green Park' do

  scenario 'last train info is not available on landing the search page' do
    visit('/tubes/search')  
    expect(page).not_to have_content('The last train leaves at')
  end

  scenario 'user searches last train GP to BX, correct time is displayed' do
    visit('/tubes/search')  

    within('#fromStation') do 
      fill_in('fromStation', with: 'green park')
      click_button('from')
    end 

    within('#toStation') do 
      fill_in('toStation', with: 'brix')
      click_button('to')
    end 

    click_button('Hurry Up!')

    expect(page).to have_content('The last train leaves at')
  end
  end
end
